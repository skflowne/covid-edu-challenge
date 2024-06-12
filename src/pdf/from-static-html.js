import credentials from "../auth";
import DCServicesSdk from "@adobe/dc-services-node-sdk";
import chalk from "chalk";

const setCustomOptions = (htmlToPDFOperation) => {
  // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
  const pageLayout = new DCServicesSdk.CreatePDF.options.PageLayout();
  pageLayout.setPageSize(8, 11.5);

  // Set the desired HTML-to-PDF conversion options.
  const htmlToPdfOptions = new DCServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
    .includesHeaderFooter(true)
    .withPageLayout(pageLayout)
    .build();
  htmlToPDFOperation.setOptions(htmlToPdfOptions);
};

export async function createPDFFromStaticHTML(htmlZipPath, outputPath) {
  // Create an ExecutionContext using credentials and create a new operation instance.
  const executionContext = DCServicesSdk.ExecutionContext.create(credentials),
    htmlToPDFOperation = DCServicesSdk.CreatePDF.Operation.createNew();

  // Set operation input from a source file.
  const input = DCServicesSdk.FileRef.createFromLocalFile(htmlZipPath);
  htmlToPDFOperation.setInput(input);

  // Provide any custom configuration options for the operation.
  setCustomOptions(htmlToPDFOperation);

  // Execute the operation and Save the result to the specified location.
  try {
    const result = await htmlToPDFOperation.execute(executionContext);
    result.saveAsFile(outputPath);
    console.log(chalk.bgGreen.white.bold("SAVED PDF AT"), outputPath);
  } catch (err) {
    if (
      err instanceof DCServicesSdk.Error.ServiceApiError ||
      err instanceof DCServicesSdk.Error.ServiceUsageError
    ) {
      console.log(
        chalk.red.bold("ERROR"),
        "Exception encountered while executing operation",
        err
      );
    } else {
      console.log(
        chalk.red.bold("ERROR"),
        "Exception encountered while executing operation",
        err
      );
    }
  }
}
