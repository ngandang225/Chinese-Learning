function separateCharacters(inputString) {
  const separateArray = inputString.split(/([^\u0000-\u007F]+)/);
  return [
    separateArray
      .slice(0, separateArray.length - 1)
      .join('')
      .trim(),
    separateArray[separateArray.length - 1].trim(),
  ];
}

export default separateCharacters;
