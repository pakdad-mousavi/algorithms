import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { parse } from "node-html-parser";
import { algorithmRoutes } from "../../src/router/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALGORITHMS_DIR = path.resolve(__dirname, "../src/views/algorithms");

const traverseChildrenNode = (parentNode) => {
  const parsedPage = [];
  let currentHeading = "Introduction";

  parentNode.children.forEach((node) => {
    if (!node?.tagName) return;

    let nodeData;
    switch (node.tagName) {
      case "P":
        nodeData = {
          type: "paragraph",
          section: currentHeading,
          content: node.text.replace(/\s+/g, " ").trim(),
        };
        break;

      case "H1":
      case "H2":
        currentHeading = node.text.replace(/\s+/g, " ").trim();
        nodeData = {
          type: "heading",
          section: currentHeading,
          content: currentHeading,
        };
        break;

      case "FIGURE":
        const srcRegex = /src="(.*?)"/;
        const captionRegex = /caption="(.*?)"/;
        const src = node.rawAttrs.match(srcRegex)?.[1];
        const content = node.rawAttrs.match(captionRegex)?.[1];
        nodeData = {
          type: "figure",
          section: currentHeading,
          src,
          content,
        };
        break;

      case "ALERT":
        nodeData = {
          type: "alert",
          section: currentHeading,
          content: node.text.replace(/\s+/g, " ").trim(),
        };
        break;

      default:
        nodeData = null;
    }

    if (nodeData) {
      parsedPage.push(nodeData);
    }
  });

  return parsedPage;
};

const buildAlgoliaRecord = (parsedPage, objectID, title) => {
  const algoliaRecord = {
    objectID,
    title,
  };

  // Headings
  const groupedSections = Object.groupBy(parsedPage, ({ section }) => section);
  const headings = Object.keys(groupedSections);

  // Sections
  const algoliaSections = [];

  for (const [title, nodes] of Object.entries(groupedSections)) {
    const flatContent = nodes
      .filter((node) => node.type !== "heading")
      .map((node) => node.content?.trim?.() ?? "")
      .filter((text) => text.length > 0)
      .join(" ");

    const section = {
      title,
      content: flatContent,
    };
    algoliaSections.push(section);
  }

  // Figures
  const groupedFigures = Object.groupBy(parsedPage, ({ type }) => type);
  const figures = groupedFigures.figure.map((node) => {
    return { src: node.src, caption: node.content };
  });

  // Create record
  algoliaRecord.headings = headings;
  algoliaRecord.sections = algoliaSections;
  algoliaRecord.figures = figures;
  return algoliaRecord;
};

const parseHTMLData = (data) => {
  const root = parse(data);
  const howItWorksTemplate = root
    .querySelectorAll("template")
    .find((tmpl) => tmpl.rawAttrs.includes("#[tabs.howItWorks.id]"));

  const templateRoot = howItWorksTemplate.firstElementChild;
  return traverseChildrenNode(templateRoot);
};

export default async () => {
  const algoliaRecords = [];

  const algorithmEntries = await fs.readdir(ALGORITHMS_DIR, {
    recursive: true,
    withFileTypes: true,
  });

  for (const entry of algorithmEntries) {
    if (entry.isDirectory()) continue;
    const algorithmFilePath = path.join(entry.parentPath, entry.name);
    const HTMLData = await fs.readFile(algorithmFilePath, { encoding: "utf-8" });

    const parsedPage = parseHTMLData(HTMLData);

    // Find the matching route for the current algorithm file
    const route = algorithmRoutes.find((r) => {
      // Get the componenent name from the import string
      const componentStr = String(r.component);
      const regex = /import\("(.*?)"\)/;
      const componentPath = componentStr.match(regex)[1];
      const componentName = path.basename(componentPath);
      return entry.name === componentName;
    });

    const objectID = route?.path;
    const title = route?.meta?.name;

    const algoliaRecord = buildAlgoliaRecord(parsedPage, objectID, title);
    algoliaRecords.push(algoliaRecord);
  }

  return algoliaRecords;
};
