const credentials = require('../auth')
const DCServicesSdk = require('@adobe/dc-services-node-sdk')

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

try {
    // Create an ExecutionContext using credentials and create a new operation instance.
   const executionContext = DCServicesSdk.ExecutionContext.create(credentials),
     htmlToPDFOperation = DCServicesSdk.CreatePDF.Operation.createNew();

   // Set operation input from a source file.
   const input = DCServicesSdk.FileRef.createFromLocalFile('resources/createPDFFromStaticHtmlInput.zip');
   htmlToPDFOperation.setInput(input);

   // Provide any custom configuration options for the operation.
   setCustomOptions(htmlToPDFOperation);

   // Execute the operation and Save the result to the specified location.
   htmlToPDFOperation.execute(executionContext)
     .then(result => result.saveAsFile('output/createPdfFromStaticHtmlOutput.pdf'))
     .catch(err => {
       if(err instanceof DCServicesSdk.Error.ServiceApiError
         || err instanceof DCServicesSdk.Error.ServiceUsageError) {
         console.log('Exception encountered while executing operation', err);
       } else {
         console.log('Exception encountered while executing operation', err);
       }
     });
} catch(e){
    console.error('Failed to create PDF', e)
}