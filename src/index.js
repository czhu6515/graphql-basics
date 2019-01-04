import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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
  
  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean! 
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
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
  Mutation: {
    createUser(parent, args, ctx, info){
      const emailTaken = users.some((user) => user.email === args.data.email)
      console.log(args.data)
      if (emailTaken){
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user)

      return user
    },
    createPost(parent, args, ctx, info){
      const userExists = users.some((user) => user.id === args.author)

      if (!userExists) {
        throw new Error('User not found.')
      }

      const post = {
        id: uuidv4(),
        ...args
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info){
      const postExists = posts.some( post => post.id === args.post )
      const userExists = users.some( user => user.id === args.author )

      if (!postExists){
        throw new Error('Post does not exist')
      } 
      
      if (!userExists){
        throw new Error('User does not exist')
      }
      
      const comment = {
        id: uuidv4(),
        ...args,
      }

      comments.push(comment)

      return comment
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
