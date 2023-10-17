const apiData = {
  users: {
    data: [
      {
        id: 1,
        name: "111",
      },
      {
        id: 2,
        name: "222",
      },
      {
        id: 3,
        name: "333",
      },
      {
        id: 4,
        name: "444",
      },
      {
        id: 5,
        name: "555",
      },
      {
        id: 6,
        name: "666",
      },
    ],
  },
};

const divisionArr = (arr: Array<any>, divisionCnt: number) => {
  const len = arr.length;
  const arraySize =
    Math.floor(len / divisionCnt) + (Math.floor(len % divisionCnt) > 0 ? 1 : 0);
  const result = [];

  for (let i = 0; i < divisionCnt; i++) {
    result.push(arr.slice(i * arraySize, i * arraySize + arraySize));
  }

  return result;
};

const {
  users: { data: users },
} = apiData;
users.sort((a, b) => b.id - a.id);
const [firstHalf, secondHalf] = divisionArr(users, 2);
console.log(firstHalf);
console.log(secondHalf);
