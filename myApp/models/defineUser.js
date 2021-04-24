module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
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
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refreshTokenExpiryTime: {
          type: DataTypes.DATE,
          allowNull: true
      },
    }); 
}