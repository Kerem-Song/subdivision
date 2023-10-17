export const divisionArr = (arr: Array<any>, divisionCnt: number) => {
  const len = arr.length;
  const arraySize =
    Math.floor(len / divisionCnt) + (Math.floor(len % divisionCnt) > 0 ? 1 : 0);
  const result = [];

  for (let i = 0; i < divisionCnt; i++) {
    result.push(arr.slice(i * arraySize, i * arraySize + arraySize));
  }

  return result;
};
