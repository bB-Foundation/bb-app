export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const truncate = function (
  fullStr: string,
  strLen: number,
  separator?: string,
) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};
