const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const _ = require("lodash");

var books = [
  {
    id: "1",
    title: "The Secret",
    gender: "Personal development",
    authorId: "2",
  },
  {
    id: "2",
    title: "12 Rules for life",
    gender: "Socialogy",
    authorId: "1",
  },
  {
    id: "3",
    title: "The Subtle Art Of Not Giving A Fuck!",
    gender: "Personal development",
    authorId: "3",
  },
];

var authors = [
  {
    id: "1",
    name: "Jordan B. Peterson",
    age: 55,
  },
  {
    id: "2",
    name: "Rhonda Byrne",
    age: 65,
  },
  {
    id: "3",
    name: "Mark Manson",
    age: 33,
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    gender: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // what should be returned by this query
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // what should be returned by this query
        return _.find(authors, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
