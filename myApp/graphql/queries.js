const { GraphQLList, GraphQLObjectType, GraphQLInt } = require('graphql');

const { FunficsType } = require('./types');
const Funfic = require('../models/initModels').Funfic;
const Chapter = require('../models/initModels').Chapter;

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Query Schema',
    fields: {
        funfics: {
            type: new GraphQLList(FunficsType),
            args: {
                id:{type: GraphQLInt},
            },
            resolve: (parent, args) => {
                return getFunfics(args)
            }
        },
    }
});

async function getFunfics(args) {
    if (args.id) {
        let funfic = await Funfic.findByPk(args.id);
        if (!funfic) return [];
        let chapters = await Chapter.findAll({
            where: {funficId: funfic.id}
        });
        if (!chapters) funfic.dataValues.chapters = []
        else funfic.dataValues.chapters = chapters;
        return [funfic.dataValues];
    } else return await Funfic.findAll();
}

module.exports = QueryType;