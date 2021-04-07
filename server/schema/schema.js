const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Author = require("../models/Author");
const Book = require("../models/Books");

const _ = require("lodash");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    field: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        const author = await Author.findOne({
          _id: parent.authorId.toString(),
        });
        return author;
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
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // what should be returned by this query
        return await Book.find({ _id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // what should be returned by this query
        return await Author.find({ _id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        return await Author.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve(parent, args) {
        // what should be returned by this query

        const newAuthor = new Author({ name: args.name, age: args.age });
        return newAuthor.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        field: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        // what should be returned by this query
        const { title, field, authorId } = args;
        const newBook = new Book({
          title,
          field,
          authorId: args.authorId,
        });
        return newBook.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
