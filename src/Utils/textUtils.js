export const pascalCaseWord = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const truncateText = (text, maxLength = 70) => {
    if (typeof text !== 'string') return text;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};