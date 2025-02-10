# Cloud Functions

This directory contains the Google Cloud Run Functions code for crawling Product Documentation data from the Notion site and retraining the chatbot with this data.

## Directory Structure

- `retrainAgent/`: Contains the `retrainAgent.py` file with the code for the `retrainAgent` function, as well as `requirements.txt` and a `README` file.
- `getProductDocumentationData/`: Contains the `getProductDocumentationData.js` file with the code for the `getProductDocumentationData` function, as well as `package.json` and a `README` file.

## Process Overview

To execute the full process, follow these steps:

1. Run `getProductDocumentationData.js`
   This script retrieves data from Notion, including all child pages, filters out unnecessary blocks, extracts relevant text content, and saves it as a text file `notion_data.txt` in a Google Cloud Storage bucket `villagewellth-agent-data-store`.

2. Run `retrainAgent.py`
   This script imports the processed Notion data from Google Cloud Storage into the Discovery Engine datastore `villagewellthdatastore_1733447536604`. It uses the ImportDocumentsRequest method with full reconciliation mode to update the datastore with the latest content.

## How to Run the Functions

1. Using the CLI (GCP SDK)

Run the following commands in your terminal:

    - To trigger getProductDocumentationData:
      `curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \ https://us-central1-acquirewell-410202.cloudfunctions.net/getProductDocumentationData`

    - To trigger retrainAgent:

      `curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \ https://us-central1-acquirewell-410202.cloudfunctions.net/retrainAgent`

2. Using the GCP Console

- Open Google Cloud Console.
- Navigate to Cloud Functions.
- Select the function you want to run (getProductDocumentationData or retrainAgent).
- Go to the Testing tab.
- Click `TEST THE FUNCTION` button to execute it.
