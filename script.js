const { Storage } = require('@google-cloud/storage');
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY });
const storage = new Storage();

const bucketName = 'villagewellth-agent-data-store';
const fileName = 'notion_data.txt';
const rootBlockId = "1299a9248aa180058ba0c9bceb2e37ea";

const fetchAllChildren = async (blockId) => {
    let allChildren = [];
    let cursor = undefined;

    do {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 50,
        });

        allChildren = allChildren.concat(response.results);
        cursor = response.next_cursor;
    } while (cursor);

    for (const block of allChildren) {
        if (block.type === "child_page") {
            const childPageId = block.id;
            const childPageChildren = await fetchAllChildren(childPageId);
            allChildren = allChildren.concat(childPageChildren);
        }
    }
    return allChildren;
}

const filterUsefulBlocks = (blocks) => blocks.filter(block => (block.type !== "divider" && !block.archived && !block.in_trash));

const extractStringFromJson = (json) => {
    let result = "";
    json.forEach((block) => {
        const typeOfBlock = block.type;
        const richText = block[typeOfBlock].rich_text;

        if (richText && richText.length) {
            richText.forEach((text) => (result += `\n${text.plain_text}`));
        }
    });
    return result;
};

exports.writeNotionDataToBucket = async (req, res) => {
    try {
        // Step 1: Fetch data from Notion, including all child pages
        const allData = await fetchAllChildren(rootBlockId);

        // Step 2: Filter blocks to keep only useful ones
        const filteredData = filterUsefulBlocks(allData);

        // Step 3: Prepare the data to save
        const uniqueData = Array.from(new Set(filteredData.map(JSON.stringify))).map(JSON.parse);

        // Step 4: Write data to GCS
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        const textContent = extractStringFromJson(uniqueData);

        await file.save(textContent, {
            contentType: 'text/plain',
        });

        // TODO: temporary commented out until permissions to view logs are granted

        // // Step 5: Retrain Agent with received data
        // const metadataServerTokenUrl = 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=https://us-central1-villagewellth.cloudfunctions.net/refreshData-authorized';
        // const tokenResponse = await fetch(metadataServerTokenUrl, {
        //     headers: {
        //         'Metadata-Flavor': 'Google',
        //     },
        // });
        // const token = await tokenResponse.text();

        // fetch('https://us-central1-acquirewell-410202.cloudfunctions.net/retrainAgent', {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });

        res.status(200).send(`Filtered data from Notion is written to the bucket \"${bucketName}\" as file \"${fileName}\".`);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing Notion data or writing to the bucket.');
    }
};
