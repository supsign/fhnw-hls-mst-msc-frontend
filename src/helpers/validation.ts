export function validateData(pdfData: any) {
    const errorBag = [];

    if (!pdfData.surname) {
        errorBag.push('Please type your Surname.');
    }
    if (!pdfData.given_name) {
        errorBag.push('Please type your Given Name.');
    }
    if (!pdfData.masterThesis.theses.length) {
        errorBag.push('Please select a broad topic for your MSc Thesis.');
    }
    if (pdfData.ects < 50) {
        errorBag.push('You have selected modules worth fewer than 50 ECTS.');
    }
    if (!errorBag.length) {
        return pdfData;
    }
    return errorBag;
}
