export const formatDateToString = (date) => {
  if (!date) return null;

  let temp = date.split("-");

  let formattedString = `${temp[2]}. ${temp[1]}. ${temp[0]}.`;

  return formattedString;
};