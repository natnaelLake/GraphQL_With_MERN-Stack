const graphql = require("graphql");
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString,GraphQLNonNull ,GraphQLID,GraphQLInt} = graphql;
const Books = require('../models/Books')
const Authors = require('../models/Authors')
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
            // return _.find(authors,{id:parent.authorId})
            return Authors.findById(parent.authorId)
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
                // return _.filter(books,{authorId:parent.id})
                return Books.findById({authorId:parent.id});
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
        // return _.find(books,{id:args.id})
        return Books.findById(args.id)
      },
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
          // return _.find(authors,{id:args.id})
          return Authors.findById(args.id)
      }
    },
    books:{
        type: new graphql.GraphQLList(BookType),
        resolve(parent,args){
            return Books.find({})
        }
    },
    authors:{
        type: new graphql.GraphQLList(AuthorType),
        resolve(parent,args){
            return Authors.find({})
        }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type:AuthorType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent,args){
        let author = Authors.create({
          name:args.name,
          age:args.age
        })
        return author
      }
    },
    addBook:{
      type:BookType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        genere:{type:new GraphQLNonNull(GraphQLString)},
        authorId:{type:new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let book = Books.create({
          name:args.name,
          genere:args.genere,
          authorId:args.authorId
        })
        return book
      }
    }
  }
})
// book(id){

// }
module.exports = new graphql.GraphQLSchema({
  query: RoootQuery,
  mutation:Mutation
});
