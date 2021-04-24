const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize('funficsdb', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql'
}); 
  
const User = require("./defineUser")(sequelize, DataTypes);
const Funfic = require("./defineFunfic")(sequelize, DataTypes);
const Chapter = require("./defineChapter")(sequelize, DataTypes);

User.hasMany(Funfic);
Funfic.belongsTo(User);

Funfic.hasMany(Chapter);
Chapter.belongsTo(Funfic);

const FunficComments = sequelize.define("funficComments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    funficId: {
        type: DataTypes.INTEGER,
        references: {
          model: Funfic,
          key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


User.hasMany(FunficComments);
FunficComments.belongsTo(User);

const FunficRatings = sequelize.define("funficRatings", {
    funficId: {
        type: DataTypes.INTEGER,
        references: {
          model: Funfic,
          key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User, 
          key: 'id'
        }
    },
    starsCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


User.hasMany(FunficRatings);
FunficRatings.belongsTo(User);

module.exports = {
    sequelize: sequelize,
    User: User,
    Funfic: Funfic,
    FunficComments: FunficComments,
    FunficRatings: FunficRatings,
    Chapter: Chapter
}