import { isType, isArray, hasLength } from './testHelpers'

const numberList = [ 0, 1, 2, 3, 4 ];

export default [
  {
    title: "Array.map()",
    instructions: `
The goal of this challenge is to square an array of numbers. Using the \`map\` function, return a new array of numbers with each item being the square of the original number from the provided numbers array.

For example, if the starting array was:\n\n \`[ 5, 3, 1 ]\`\n\n the returned array should be: \n\n \`[ 25, 9, 1 ]\`
`,
    arguments: [],
    startCode: `const numbers = [ ${numberList.join(', ')} ];\n\nreturn // Return your answer here`,
    tests: [
      isArray,
      r => hasLength(r, 5),
      r => r.every((num, i) => num === numberList[i] * numberList[i])
    ]
  }
]
