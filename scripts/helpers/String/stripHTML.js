export const pattern = /<(?:.|\n)*?>/gm;

export default (text) =>
    text.replace(pattern, '');
