
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("funfic", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
          type: DataTypes.STRING,
          allowNull: false
      },
      genre: {
          type: DataTypes.STRING,
          defaultValue: ""
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      scoreCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      shortDescription: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
  }); 
}