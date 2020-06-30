import arg from "arg";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import { createPDFFromStaticHTML } from "../pdf/from-static-html";

function parseArguments(rawArgs) {
  const args = arg({
    "--html": String,
    "--out": String,
  });

  return {
    htmlZipPath: args["--html"],
    outputPath: args["--out"],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.htmlZipPath) {
    questions.push({
      type: "input",
      name: "htmlZipPath",
      message: "Enter path of the static HTML zip file",
      validate: (input) => {
        return path.extname(input) === ".zip"
          ? true
          : "Must point to a valid zip file containing the HTML file";
      },
    });
  }

  const defaultOutputPath = path.join("output", `PDF-HTML-${Date.now()}.pdf`);
  if (!options.outputPath) {
    questions.push({
      type: "input",
      name: "outputPath",
      message: "Enter path of desired output",
      default: defaultOutputPath,
      filter: (input) => {
        if (path.extname(input) !== ".pdf") {
          return `${input}.pdf`;
        } else {
          return input;
        }
      },
      validate: (input) => {
        return path.extname(input) === ".pdf";
      },
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers,
  };
}

export async function cli(args) {
  let options = parseArguments(args);
  try {
    options = await promptForMissingOptions(options);
    try {
      console.log(chalk.bgBlue.white.bold("INPUT HTML"), options.htmlZipPath);
      console.log(chalk.bgMagenta.white.bold("OUTPUT PDF"), options.outputPath);
      await createPDFFromStaticHTML(options.htmlZipPath, options.outputPath);
    } catch (e) {
      console.error("Failed to create PDF", e);
    }
  } catch (e) {
    console.error("Failed to parse arguments", e);
  }
}
