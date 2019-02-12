const spaces = /\s/;
export const standart = (string) => {
    return string.split(spaces).filter((item) => item);
};