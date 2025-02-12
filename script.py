from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine

project_id = "villagewellth"
location = "global"
data_store_id = "sw_1734042004113"

# Examples:
# - Unstructured documents
#   - `gs://bucket/directory/file.pdf`
#   - `gs://bucket/directory/*.pdf`
# - Unstructured documents with JSONL Metadata
#   - `gs://bucket/directory/file.json`
# - Unstructured documents with CSV Metadata
#   - `gs://bucket/directory/file.csv`
# gcs_uri = "YOUR_GCS_PATH"

#  For more information, refer to:
# https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
client_options = (
    ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
    if location != "global"
    else None
)

# Create a client
client = discoveryengine.DocumentServiceClient(client_options=client_options)

# The full resource name of the search engine branch.
# e.g. projects/{project}/locations/{location}/dataStores/{data_store_id}/branches/{branch}
parent = client.branch_path(
    project=project_id,
    location=location,
    data_store=data_store_id,
    branch="default_branch",
)

request = discoveryengine.ImportDocumentsRequest(
    parent=parent,
    gcs_source=discoveryengine.GcsSource(
        # Multiple URIs are supported
        input_uris=['gs://starwars-train/notion_data_new.txt'],
        # Options:
        # - `content` - Unstructured documents (PDF, HTML, DOC, TXT, PPTX)
        # - `custom` - Unstructured documents with custom JSONL metadata
        # - `document` - Structured documents in the discoveryengine.Document format.
        # - `csv` - Unstructured documents with CSV metadata
        data_schema="content",
    ),
    # Options: `FULL`, `INCREMENTAL`
    reconciliation_mode=discoveryengine.ImportDocumentsRequest.ReconciliationMode.FULL,
)

# Make the request
operation = client.import_documents(request=request)

print(f"Waiting for operation to complete: {operation.operation.name}")
response = operation.result()

# After the operation is complete,
# get information from operation metadata
metadata = discoveryengine.ImportDocumentsMetadata(operation.metadata)

# Handle the response
print(response)
print(metadata)