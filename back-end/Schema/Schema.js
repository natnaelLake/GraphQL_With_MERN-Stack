const graphql = require("graphql");
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString ,GraphQLID,GraphQLInt} = graphql;

const books = [
  {
    name: "name 1",
    genere: "genere 1",
    id: "1",
    authorId:'1'
  },
  {
    name: "name2",
    genere: "genere 2",
    id: "2",
    authorId:'2'
  },
  {
    name: "name 3",
    genere: "genere 3",
    id: "3",
    authorId:'3'
  },
  {
    name: "name 7",
    genere: "genere 7",
    id: "7",
    authorId:'2'
  },
  {
    name: "name 4",
    genere: "genere 4",
    id: "4",
    authorId:'3'
  },
  {
    name: "name 6",
    genere: "genere 6",
    id: "6",
    authorId:'2'
  },
  {
    name: "name 5",
    genere: "genere 5",
    id: "5",
    authorId:'3'
  },
  
];
const authors = [
    {
      name: "abebe 1",
      age:50,
      id: "1",
    },
    {
      name: "alemu",
      age: 30,
      id: "2",
    },
    {
      name: "almaz 3",
      age:80,
      id: "3",
    },
  ];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genere: { type: GraphQLString },
    author:{
        type:AuthorType,
        resolve(parent,args){
            return _.find(authors,{id:parent.authorId})
        }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
})
const RoootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books,{id:args.id})
      },
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
          return _.find(authors,{id:args.id})
      }
    },
    books:{
        type: new graphql.GraphQLList(BookType),
        resolve(parent,args){
            return books
        }
    },
    authors:{
        type: new graphql.GraphQLList(AuthorType),
        resolve(parent,args){
            return authors
        }
    }
  }
});

// book(id){

// }
module.exports = new graphql.GraphQLSchema({
  query: RoootQuery,
});
