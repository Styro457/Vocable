function onFormSubmit(word, button) {
    const createResults = async () => {
        const result = await addResultsForKeyword(word);
    }
    createResults().then(r => console.log("DONE"));
    button.disabled = true;
}