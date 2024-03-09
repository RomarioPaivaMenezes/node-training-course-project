

console.log(process.argv)

// arg name
const args1 = process.argv.slice(2)
const name = args1[0].split('=')[1]

// arg age

const args2 = process.argv.slice(3)
const age = args2[0].split('=')[1]


console.log(`his name is ${name} and he is ${age} years old!`)



