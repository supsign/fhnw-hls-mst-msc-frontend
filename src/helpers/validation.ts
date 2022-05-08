export function validateData(pdfData: any) {
    console.log(pdfData);
    const errorBag = [];

    if (!pdfData.surname) {
        errorBag.push('Please type your Surname.');
    }
    if (!pdfData.given_name) {
        errorBag.push('Please type your Given Name.');
    }
    if (!pdfData.master_thesis.theses.length) {
        errorBag.push('Please select a broad topic for your MSc Thesis.');
    }
    if (pdfData.statistics.cluster < 3) {
        errorBag.push('You need to select at least three cluster-specific modules. Please correct.');
    }
    if (pdfData.statistics.ects < 50) {
        errorBag.push('You have selected modules worth fewer than 50 ECTS.');
    }
    if (!errorBag.length) {
        return pdfData;
    }
    return {
        amount: errorBag.length,
        errors: errorBag,
    };
}
