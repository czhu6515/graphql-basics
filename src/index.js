import { GraphQLServer } from 'graphql-yoga'

// Scalar Types = String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
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
    }
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => {
  console.log('server is functional')
})
