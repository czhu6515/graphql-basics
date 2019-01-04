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
    id: 11,
    title: 'Test',
    body: 'This should come back',
    published: false,
    author: 1,
  },
  {
    id: 12,
    title: 'blah',
    body: 'this should not come back',
    published: false,
    author: 1
  },
  {
    id: 13,
    title: 'Yay',
    body: 'This test should come back',
    published: false,
    author: 2,
  }
]

const comments = [
  {
    id: 21,
    text: "first comment",
    author: 3,
    post: 11,
  },
  {
    id: 22,
    text: "second comment",
    author: 3,
    post: 12,
  },
  {
    id: 23,
    text: "third comment",
    author: 1,
    post: 12,
  },
  {
    id: 24,
    text: "fourth comment",
    author: 2,
    post: 13,
  },
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    },
    comments(parent, args, ctx, info){
      return comments
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find((user) => user.id === parent.author)
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment) => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info){
      return posts.filter((post) => post.author === parent.id)
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment) => comment.author === parent.id)
    },
  },
  Comment: {
    author(parent, args, ctx, info){
      return users.find((user) => user.id === parent.author)
    },
    post(parent, args, ctx, info){
      return posts.find((post) => post.id === parent.post)
    }
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => {
  console.log('server is functional')
})
