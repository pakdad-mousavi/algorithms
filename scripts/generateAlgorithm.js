import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import chalk from "chalk";
import { algorithmRoutes } from "../src/router/routes.js";
import { execSync } from "child_process";
import { exit } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const algorithmsDir = path.resolve(__dirname, "../src/views/algorithms");
const routerFile = path.resolve(__dirname, "../src/router/routes.js");

const existingCategories = new Set(algorithmRoutes.map((route) => route.meta.groupName));

const toPascalCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^./, (chr) => chr.toUpperCase());
};

const getAlgorithmDetails = async () => {
  const answers = await inquirer.prompt([
    {
      name: "algorithmName",
      message: "Algorithm Name (e.g. Quick Sort):",
      validate: (input) => !!input || "Name cannot be empty!",
    },
    {
      name: "category",
      type: "list",
      loop: false,
      message: "Algorithm Category:",
      choices: ["New Category", new inquirer.Separator(), ...existingCategories],
    },
    {
      name: "newCategory",
      message: "New Category Name (e.g. Sorting Algorithms):",
      when: (answers) => answers.category === "New Category", // Only for new categories
      validate: (input) => !!input || "Category cannot be empty!",
    },
  ]);
  console.log("\n"); // Extra space

  const { algorithmName, category, newCategory } = answers;
  return {
    algorithmName: algorithmName.trim(),
    category: category.trim(),
    newCategory: newCategory?.trim(),
  };
};

const generateVueComponent = (componentFilePath, algorithmName) => {
  // Create directory if not exist
  fs.mkdirSync(path.dirname(componentFilePath), { recursive: true });
  // Get the template file
  const templatePath = path.join(__dirname, "templates", "algorithm.vue");
  let vueTemplate = fs.readFileSync(templatePath, "utf-8");
  vueTemplate = vueTemplate.replace(/__ALGORITHM_NAME__/g, algorithmName);
  // Write to file
  fs.writeFileSync(componentFilePath, vueTemplate);
  // Success message
  console.log(
    chalk.green("Successfully created ") + chalk.cyan(`${path.basename(componentFilePath)}.`)
  );
};

const appendRouteToRouterFile = (
  algorithmName,
  componentName,
  algorithmDirname,
  selectedCategory
) => {
  const camelCaseName = algorithmName.replace(/\s+/g, "-").toLowerCase();
  const routeEntry = `{
  path: "/${algorithmDirname}/${camelCaseName}",
  component: () => import("@/views/algorithms/${algorithmDirname}/${componentName}.vue"),
  meta: {
    groupName: "${selectedCategory}",
    name: "${algorithmName}"
  }
},`;

  try {
    // Read the router file
    const routerContent = fs.readFileSync(routerFile, "utf-8");
    // Find the array where routes are defined (assumes "export const algorithmRoutes = [" exists)
    const routeArrayMatch = routerContent.match(
      /(export\s+const\s+algorithmRoutes\s*=\s*\[)([\s\S]*?)(\][^]*;)/m
    );
    if (routeArrayMatch) {
      const [_, arrayStart, arrayContent, arrayEnd] = routeArrayMatch;
      // Insert the new route before the closing bracket
      const newArrayContent = arrayContent.trim().endsWith(",")
        ? arrayContent + routeEntry
        : arrayContent + ",\n" + routeEntry;
      // Insert new router content
      const newRouterContent = arrayStart + newArrayContent + arrayEnd;
      fs.writeFileSync(routerFile, newRouterContent, "utf-8");
      // Success message
      console.log(chalk.green("Successfully added route for ") + chalk.cyan(`${algorithmName}.`));
    } else {
      throw new Error("Could not find algorithmRoutes array in router file.");
    }
  } catch (err) {
    console.error(chalk.red("Error: Could not insert new route into router file. Exiting..."));
    exit(1);
  }
};

const formatRouterWithPrettier = () => {
  // Format the router file using prettier if available
  try {
    execSync(`npx prettier --write "${routerFile}"`, { stdio: "ignore" });
    console.log(chalk.green("Successfully formatted router file with ") + chalk.cyan("Prettier."));
  } catch (err) {
    const errMessage = chalk.yellow("Could not format router file with Prettier. Is it installed?");
    console.warn(errMessage);
  }
};

const main = async () => {
  const { algorithmName, category, newCategory } = await getAlgorithmDetails();

  const componentName = toPascalCase(algorithmName);
  const selectedCategory = newCategory ? newCategory : category;
  const algorithmDirname = selectedCategory.toLowerCase().replace(/\s+/g, "-");

  const componentFilePath = path.join(algorithmsDir, algorithmDirname, `${componentName}.vue`);

  // 1. Generate .vue component file
  generateVueComponent(componentFilePath, algorithmName);

  // 2. Append new route to router
  appendRouteToRouterFile(algorithmName, componentName, algorithmDirname, selectedCategory);

  // 3. Try to format router file with prettier
  formatRouterWithPrettier();

  console.log(
    `\n"${algorithmName}" template file and route created:\n` + chalk.cyan(componentFilePath)
  );
};

main();
