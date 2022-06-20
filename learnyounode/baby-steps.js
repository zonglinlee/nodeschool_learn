// Write a program that accepts one or more numbers as command-line arguments and prints the sum of those numbers
// to the console (stdout).

// node ./baby-steps.js 1 2 3

console.log(process.argv)
const result = process.argv
    .filter((arg, index) => index >= 2)
    .reduce((acc, item) => {
        acc = Number(item) + Number(acc)
        return acc
    })
console.log(result)
