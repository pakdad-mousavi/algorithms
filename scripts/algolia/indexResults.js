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
  const { ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY, SAVE_ALGOLIA_JSON } = process.env;
  const records = await generateAlgoliaRecords();
  // Optional: save to file for inspection
  if (SAVE_ALGOLIA_JSON) {
    await saveRecordsToFile(records);
  }

  // Index to algolia
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
  await client.saveObjects({ indexName: "algorithms_index", objects: records });
};

(async () => main())();
