const {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLFloat,
    GraphQLList
} = require('graphql');

const ChapterType = new GraphQLObjectType({
    name: 'ChapterType',
    description: 'Chapters list',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        text: { type: GraphQLString },
        number: {type: GraphQLInt }
    }
});

const FunficsType = new GraphQLObjectType({
    name: 'FunficsType',
    description: 'Funfics list',
    fields: {
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt },
        name: { type: GraphQLString },
        author: { type: GraphQLString },
        genre: { type: GraphQLString },
        rating: {type: GraphQLFloat },
        scoreCount: {type: GraphQLInt },
        shortDescription: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        chapters: { type: new GraphQLList(ChapterType)}
    }
});

module.exports = { FunficsType, ChapterType };