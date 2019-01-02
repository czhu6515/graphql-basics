const message = "some message form myModule.js"
const name = "Chen"
const location = "Miami"
const getGreeting = (name) => {
  return `Welcome to the course ${name}!`
}

export { message, name, getGreeting, location as default }
