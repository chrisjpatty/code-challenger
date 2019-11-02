import { isType, isArray, hasLength, usedSnippet, isObject } from './testHelpers'

const numberList = [ 0, 1, 2, 3, 4 ];

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
    ]
  }
]
