export const pascalCaseWord = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const truncateText = (text, maxLength = 70) => {
    if (typeof text !== 'string') return text;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const checkTextLength = (text, length) => {
    if(text.trim().length < length )
        return false;
    return true;
}

export const isPhoneNumber = (str) =>  /^[0-9]{6,15}$/.test(str);


export const  isNumeric = (str) => /^[0-9]+$/.test(str);
