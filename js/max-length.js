export function getMaxStringLength (string, maxLength) {
  const stringLength = string.length;


  //  eslint-disable-next-line no-console
  // console.log(stringLength, maxLength);
  if (stringLength <= maxLength) {
    return true;
  }

  return false;

  //  eslint-disable-next-line no-console
  // console.log(stringLength);
}
