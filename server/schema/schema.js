const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const _ = require("lodash");

var books = [
  {
    id: "1",
    title: "The Secret",
    gender: "Personal development",
  },
  {
    id: "2",
    title: "12 Rules for life",
    gender: "Socialogy",
  },
  {
    id: "3",
    title: "The Subtle Art Of Not Giving A Fuck!",
    gender: "Personal development",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // what should be returned by this query
        return _.find(books, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLObjectType({
  query: RootQuery,
});
