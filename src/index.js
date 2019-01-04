import { GraphQLServer } from 'graphql-yoga'

// Scalar Types = String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
    add(x: Float, y: Float): Float!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '12131fds',
        name: 'Joe',
        email: 'Joe@jj.com',
      }
    },
    post() {
      return {
        id: '12ef21',
        title: 'Best Post Ever',
        body: "This is not the body of the best post ever, it's just a tribute",
        published: true,
      }
    },
    greeting(parent, args, ctx, info){
      if (args.name && args.position){
        return `Hello ${args.name}, you are the best ${args.position} in the world!`
      }
      return "Hello there"
    },
    add(parent, args, ctx, info){
      if (args.x && args.y){
        return args.x + args.y
      }
      return "Enter two numbers"
    }
    
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => {
  console.log('server is functional')
})
