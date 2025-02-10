import { Storage } from "@google-cloud/storage";
import { Request, Response } from "express";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PartialBlockObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

const rootBlockId = "153142f69cd2800caec7f025d24fc4d7";
const bucketName = " starwars-train";
const fileName = "notion_test.txt";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const storage = new Storage();

const fetchAllChildren = async (
  blockId: string
): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> => {
  let allChildren: (PartialBlockObjectResponse | BlockObjectResponse)[] = [];
  let cursor = undefined;

  do {
    const response: ListBlockChildrenResponse =
      await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 50,
      });

    allChildren = allChildren.concat(response.results);
    cursor = response.next_cursor;
  } while (cursor);

  for (const block of allChildren) {
    const typedBlock = block as BlockObjectResponse;
    if (typedBlock.type === "child_page") {
      const childPageId = block.id;
      const childPageChildren = await fetchAllChildren(childPageId);
      allChildren = allChildren.concat(childPageChildren);
    }
  }

  return allChildren;
};

const filterUsefulBlocks = (
  blocks: (PartialBlockObjectResponse | BlockObjectResponse)[]
): (PartialBlockObjectResponse | BlockObjectResponse)[] =>
  blocks.filter(
    (block) =>
      "type" in block &&
      block?.type !== "divider" &&
      !block?.archived &&
      !block?.in_trash
  );

const extractStringFromJson = (json: string[]) => {
  let result = "";
  json.forEach((block) => {
    const parsedBlock = JSON.parse(block);
    const typeOfBlock = parsedBlock.type;
    const richText = parsedBlock[typeOfBlock].rich_text;

    if (richText && richText.length) {
      richText.forEach(
        (text: TextRichTextItemResponse) => (result += `\n${text.plain_text}`)
      );
    }
  });
  return result;
};

export const writeNotionDataToBucket = async (_req: Request, res: Response) => {
  try {
    // Step 1: Fetch data from Notion, including all child pages
    const allData = await fetchAllChildren(rootBlockId);

    // Step 2: Filter blocks to keep only useful ones
    const filteredData = filterUsefulBlocks(allData);

    // Step 3: Prepare the data to save
    const uniqueData = Array.from(
      new Set(filteredData.map((object) => JSON.stringify(object)))
    );

    // Step 4: Write data to GCS
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const textContent = extractStringFromJson(uniqueData);

    await file.save(textContent, {
      contentType: "text/plain",
    });

    res
      .status(200)
      .send(
        `Filtered data from Notion is written to the bucket \"${bucketName}\" as file \"${fileName}\".`
      );
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send(
        "An error occurred while processing Notion data or writing to the bucket."
      );
  }
};

writeNotionDataToBucket(req, res);
