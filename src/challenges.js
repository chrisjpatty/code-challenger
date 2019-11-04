import {
  isType,
  isArray,
  hasLength,
  usedSnippet,
  isObject,
  usedAtLeastNumOfSnippet,
  hasProperties,
  shallowMatchesObject
} from "./testHelpers";
import {
  numberList,
  numberList2,
  fruit,
  cars
} from './data'

export default [
  {
    title: "Array.map()",
    id: "9ee5ed",
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
    id: "700164",
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
    id: "d728d8",
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
    id: "5e6ccc",
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
  },
  {
    title: "Array.reduce()",
    id: "db0c98",
    instructions: `
The goal of this challenge is to take an array of arrays, and reduce it into a single object.

Each array in the fruit array has the name of the fruit as the first item, the color of the fruit as the second item, and the id as the third item.

Using the \`reduce\` function, return an object with a key for each fruit id, pointing to having the following keys:

- \`name\`: The name of the fruit.
- \`color\`: The color of the fruit.
- \`id\`: The id of the fruit.

For example, if the fruit array looked like this:

\`\`\`
[
  ["Watermelon", "Pink", "4"],
  ["Grape", "Purple", "5"],
  ["Pear", "Yellow", "6"]
]
\`\`\`

You would return an object like this:

\`\`\`
{
  4: {
    name: "Watermelon",
    color: "Pink",
    id: "4"
  },
  5: {
    name: "Grape",
    color: "Purple",
    id: "5"
  },
  6: {
    name: "Pear",
    color: "Yellow",
    id: "6"
  }
}
\`\`\`
`,
    startCode: `const fruit = [
  ${fruit.map(f => `[${f.map(x => `"${x}"`).join(', ')}]`).join(',\n  ')}
];\n\n// Return your answer below\nreturn `,
    tests: [
      isObject,
      r => r.hasOwnProperty("1"),
      r => r.hasOwnProperty("2"),
      r => r.hasOwnProperty("3"),
      r => fruit.every(f => isObject(r[f[2]])),
      r => fruit.every(f => r[f[2]].hasOwnProperty("name")),
      r => fruit.every(f => r[f[2]].hasOwnProperty("color")),
      r => fruit.every(f => r[f[2]].hasOwnProperty("id")),
      r => fruit.every((f, i) => r[f[2]].name === fruit[i][0] && r[f[2]].color === fruit[i][1]),
      (r, c, code) => usedSnippet(code, '.reduce(')
    ]
  },
  {
    title: "Object.filter()",
    id: "8dbb7a",
    instructions: `
In this challenge we will filter an array of objects. Using the \`filter\` function, filter all car objects out of the cars array that are older than 2010.

For example, if this was the cars array:

\`\`\`
[
  {
    make: "Nissan",
    model: "Sentra",
    year: 2008
  },
  {
    make: "Hyundai",
    model: "Sonata",
    year: 2013
  }
]
\`\`\`

The returned array would be:

\`\`\`
[
  {
    make: "Hyundai",
    model: "Sonata",
    year: 2013
  }
]
\`\`\`

> **Hint:** Be sure to only filter out cars that are **older** than 2010.
`,
    startCode: `const cars = [
  ${cars
  .map(
    c =>
      `{\n    ${Object.entries(c)
        .map(
          ([key, value]) =>
            `${key}: ${typeof value === "string" ? `"${value}"` : value}`
        )
        .join(`,\n    `)}\n  }`
  )
  .join(",\n  ")
}
]

// Return your answer below
return `,
    tests: [
      isArray,
      r => hasLength(r, 2),
      r => r.every(isObject),
      r => r.every(car => hasProperties(car, ["make", "model", "year"])),
      r => r.every(car => typeof car.year === 'number'),
      r => shallowMatchesObject(r[0], cars[0]),
      r => shallowMatchesObject(r[1], cars[2]),
      (r, c, code) => usedSnippet(code, '.filter(')
    ]
  }
]
