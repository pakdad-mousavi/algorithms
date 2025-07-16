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
      name: "slug",
      message: "Algorithm Slug (e.g. quick-sort):",
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
    {
      name: "isTemplated",
      message: "Would you like the algorithm view to be pre-templated?",
      default: true,
      type: "confirm",
      validate: (input) => !!input || "Please choose a valid option!",
    },
    {
      name: "isConfirmed",
      message: "Confirm Algorithm Generation?",
      default: true,
      type: "confirm",
      validate: (input) => !!input || "Please choose a valid option!",
    },
  ]);
  console.log("\n"); // Extra space

  const { algorithmName, slug, category, newCategory, isTemplated, isConfirmed } = answers;
  return {
    algorithmName: algorithmName.trim(),
    slug: slug.trim(),
    category: category.trim(),
    newCategory: newCategory?.trim(),
    isTemplated,
    isConfirmed,
  };
};

const generateVueComponent = (componentFilePath, algorithmName, algorithmDirname, isTemplated) => {
  try {
    // Create directory if not exist
    fs.mkdirSync(path.dirname(componentFilePath), { recursive: true });
    // Get the template file and replace placeholders
    const templateName = isTemplated ? "templatedAlgorithm.vue" : "plainAlgorithm.vue";
    const templatePath = path.join(__dirname, "templates", templateName);
    let vueTemplate = fs.readFileSync(templatePath, "utf-8");
    vueTemplate = vueTemplate.replace(/__ALGORITHM_NAME__/g, algorithmName);
    vueTemplate = vueTemplate.replace(/__ALGORITHM_DIRNAME__/g, algorithmDirname);
    // Write to file
    fs.writeFileSync(componentFilePath, vueTemplate);
    // Success message
    console.log(
      chalk.green("Successfully created ") + chalk.cyan(`${path.basename(componentFilePath)}.`)
    );
  } catch (err) {
    console.error(chalk.red("Error: Could not generate vue component. Exiting..."));
    exit(1);
  }
};

const generateAlgorithmComposable = (algorithmDirname) => {
  const templatePath = path.join(__dirname, "templates", "composable.js");
  const composablePath = path.resolve(__dirname, `../src/composables/${algorithmDirname}.js`);

  try {
    // Read template and write to the composable
    const composableTemplate = fs.readFileSync(templatePath, "utf-8");
    fs.writeFileSync(composablePath, composableTemplate, { flag: "wx" }); // wx: Like 'w' but fails if the path exists
    console.log(
      chalk.green("Successfully created algorithm composable ") +
        chalk.cyan(`${algorithmDirname}.js.`)
    );
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(chalk.yellow("Algorithm composable already exists, skipping..."));
    } else {
      console.error(err);
      console.error(chalk.yellow("Failed to create algorithm composable. Skipping...") + "\n");
    }
  }
};

const appendRouteToRouterFile = (
  algorithmName,
  slug,
  componentName,
  algorithmDirname,
  selectedCategory
) => {
  const camelCaseName = slug.replace(/\s+/g, "-").toLowerCase();
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
  const { algorithmName, slug, category, newCategory, isTemplated, isConfirmed } =
    await getAlgorithmDetails();

  if (!isConfirmed) {
    return console.log(chalk.gray("Algorithm generation cancelled."));
  }

  const componentName = toPascalCase(slug);
  const selectedCategory = newCategory ? newCategory : category;
  const algorithmDirname = selectedCategory.toLowerCase().replace(/\s+/g, "-");

  const componentFilePath = path.join(algorithmsDir, algorithmDirname, `${componentName}.vue`);

  console.log(chalk.gray("Create algorithm view and composable..."));
  if (isTemplated) {
    generateAlgorithmComposable(algorithmDirname);
  }
  generateVueComponent(componentFilePath, algorithmName, algorithmDirname, isTemplated);

  console.log(chalk.gray("\nUpdating page routes..."));
  appendRouteToRouterFile(algorithmName, slug, componentName, algorithmDirname, selectedCategory);

  console.log(chalk.gray("\nFormatting routes.js..."));
  formatRouterWithPrettier();

  console.log(
    chalk.bold(`\n"${algorithmName}" algorithm created successfully! Start working: \n`) +
      chalk.cyan(componentFilePath)
  );
};

main();
