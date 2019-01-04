import { GraphQLServer } from 'graphql-yoga'

// Scalar Types = String, Boolean, Int, Float, ID

// Demo User Data
const users = [
  {
    id: 1,
    name: 'Chen',
    email: 'chen@example.com',
  },
  {
    id: 2,
    name: 'Bob',
    email: 'Bob@example.com',
    age: 33
  },
  {
    id: 3,
    name: 'Jane',
    email: 'jane@example.com',
    age: 23
  }
]
// Demo Posts Data
const posts = [
  {
    id: 1,
    title: 'Test',
    body: 'This should come back',
    published: false
  },
  {
    id: 2,
    title: 'blah',
    body: 'this should not come back',
    published: false
  },
  {
    id: 3,
    title: 'Yay',
    body: 'This test should come back',
    published: false
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
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
    users(parent, args, ctx, info){
      const { query } = args
      if (!query){
        return users
      }
      return users.filter( user => user.name.toLowerCase().includes(query.toLowerCase()))
    },
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
    posts(parent, args, ctx, info){
      const { query } = args
      if (!query){
        return posts
      }
      return posts.filter( post => post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()))
    }
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => {
  console.log('server is functional')
})
