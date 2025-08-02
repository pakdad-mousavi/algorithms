import generateAlgoliaRecords from "./generateRecords.js";
import { algoliasearch } from "algoliasearch";
import path from "path";
import fs from "fs/promises";

const TMP_RECORDS_FILEPATH = path.resolve(process.cwd(), "scripts/tmp/algoliaRecords.json");

const saveRecordsToFile = async (records) => {
  try {
    const jsonRecords = JSON.stringify(records, null, 2);
    await fs.writeFile(TMP_RECORDS_FILEPATH, jsonRecords, { encoding: "utf-8", flag: "w" });
  } catch (e) {
    throw new Error(`Could not write algolia records to ${TMP_RECORDS_FILEPATH}`);
  }
};

const main = async () => {
  const { ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY, NODE_ENV } = process.env;
  const records = await generateAlgoliaRecords();
  console.log(NODE_ENV);
  if (NODE_ENV === "production") {
    // Index algolia records
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
    await client.saveObjects({ indexName: "algorithms_index", objects: records });
  } else {
    // Only during development/debugging: save to file for inspection
    await saveRecordsToFile(records);
  }
};

(async () => main())();
