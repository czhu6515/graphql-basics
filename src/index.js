import myLocation, { message, name, getGreeting } from './myModule'
import add, { subtract } from './math'


console.log(message)
console.log(name)
console.log(myLocation)
console.log(getGreeting('Bob'))

console.log(add(30, 20))
console.log(subtract(30, 20))
