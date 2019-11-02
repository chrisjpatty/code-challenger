import {
  isType,
  isArray,
  hasLength,
  usedSnippet,
  isObject,
  usedAtLeastNumOfSnippet
} from "./testHelpers";

const numberList = [ 0, 1, 2, 3, 4 ];
const numberList2 = [ 1, 2, 3, 4, 5 ];

export default [
  {
    title: "Array.map()",
    instructions: `
The goal of this challenge is to square an array of numbers. Using the \`map\` function, return a new array of numbers with each item being the square of the original number from the provided numbers array.

For example, if the starting array was:\n\n \`[ 5, 3, 1 ]\`\n\n the returned array should be: \n\n \`[ 25, 9, 1 ]\`
`,
    arguments: [],
    startCode: `const numbers = [ ${numberList.join(', ')} ];\n\n// Return your answer below\nreturn `,
    tests: [
      isArray,
      r => hasLength(r, 5),
      r => r.every((num, i) => num === numberList[i] * numberList[i]),
      (r, c, code) => usedSnippet(code, '.map(')
    ]
  },
  {
    title: "Array.map()",
    instructions: `
The goal of this challenge is to use the \`map\` function to transform an array of numbers into an array of objects. Each object should have the following keys:

- \`squared\`: The squared result of the number.
- \`half\`: Half of the original number.
- \`double\`: Double the original number.

For example, if the number was 10, you would return an object like this:

\`\`\`js
{
  squared: 100,
  half: 5,
  double: 20
}
\`\`\`
`,
    arguments: [],
    startCode: `const numbers = [ ${numberList.join(', ')} ];\n\n// Return your answer below\nreturn `,
    tests: [
      isArray,
      r => hasLength(r, 5),
      r => r.every(numObj => isObject(numObj)),
      r => r.every((numObj, i) => numObj.hasOwnProperty('squared') && numObj.squared === numberList[i] * numberList[i]),
      r => r.every((numObj, i) => numObj.hasOwnProperty('half') && numObj.half === numberList[i] / 2),
      r => r.every((numObj, i) => numObj.hasOwnProperty('double') && numObj.double === numberList[i] * 2),
      (r, c, code) => usedSnippet(code, '.map(')
    ]
  },
  {
    title: "Array.map()",
    instructions: `
In this challenge we'll be using the \`map\` function to transform an array of numbers into an array of arrays. Each array in the array will be a copy of the original numbers array, but with each item being multiplied by the number in the numbers array at the same index as the new array.

For example, if the numbers array was:

\`\`\`
[ 3, 5, 2 ]
\`\`\`

The returned array would be:

\`\`\`js
[
  [ 9, 15, 6 ],
  [ 15, 25, 10 ],
  [ 6, 10, 4 ]
]
\`\`\`

> **Hint:** You will need to use the \`map\` function twice.
`,
    startCode: `const numbers = [ ${numberList.join(', ')} ];\n\n// Return your answer below\nreturn `,
    tests: [
      isArray,
      r => hasLength(r, 5),
      r => r.every(numArr => isArray(numArr)),
      r => r.every(numArr => hasLength(numArr, 5)),
      r => r.every((numArr, i) => numArr.every((num, k) => num === numberList[k] * numberList[i])),
      (r, c, code) => usedAtLeastNumOfSnippet(code, '.map(', 2)
    ]
  },
  {
    title: "Array.reduce()",
    instructions: `
In this challenge, we'll be using the \`reduce\` function to reduce our array of numbers into the product of all the numbers in the array.

For example, if the numbers array was:

\`\`\`
[ 2, 4, 6 ]
\`\`\`

The returned number would be \`48\`, because \`2 * 4 * 6 = 48\`.
`,
    startCode: `const numbers = [ ${numberList2.join(', ')} ];\n\n// Return your answer below\nreturn `,
    tests: [
      r => isType(r, 'number'),
      r => r === numberList2.reduce((prod, n) => prod * n, 1),
      (r, c, code) => usedSnippet(code, '.reduce(')
    ]
  }
]
