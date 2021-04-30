const { GraphQLSchema } = require('graphql');

const QueryType = require('./queries');
//const MainMutationType = require('./mutations');

const MainSchema = new GraphQLSchema({
    query: QueryType,
    //mutation: MainMutationType
});

module.exports = MainSchema;