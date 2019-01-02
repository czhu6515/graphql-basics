import { GraphQLServer } from 'graphql-yoga'

// Scalar Types = String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    title(){
      return 'A Feast for Crows'
    },
    price(){
      return 23.99
    },
    releaseYear(){
      return 2010
    },
    rating(){
      return null
    },
    inStock(){
      return false
    }
  }
}

const server = new GraphQLServer({
  typeDefs, resolvers
})

server.start(() => {
  console.log('server is functional')
})
