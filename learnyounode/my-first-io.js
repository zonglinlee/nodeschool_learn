// Write a program that uses a single synchronous filesystem operation to read a file and print
// the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l

// node ./my-first-io.js ./baby-steps.js

const fs = require('fs')
const contents = fs.readFileSync(process.argv[2]) // This method will return a Buffer object containing the complete contents of the file
// Buffer objects are Node's way of efficiently representing arbitrary arrays of data, whether it be ascii,
// binary or some other format. Buffer objects can be converted to strings by simply calling the toString() method on them
// file does not have a newline character ('\n') at the end of the last line
const lines = contents.toString().split('\n').length - 1
console.log(lines)
