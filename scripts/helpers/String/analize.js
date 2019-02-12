export default (text, charFilter = a => a, tokenizer = a => a, filters = []) =>
    filters.reduce((tokens, filter) => filter(tokens), tokenizer(charFilter(text)));