import { Model, DataTypes } from "sequelize";

class Artist extends Model {
  static init(sequelize) {
    super.init(
      {
        idartist: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        createdat: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        artistname: {
          type: DataTypes.STRING,
        },
        officiallink: DataTypes.STRING,
        spotifycode: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "Artist",
        modelName: "Artist",
        updatedAt: false,
        createdAt: "createdat",
      }
    );

    return this;
  }
}

export default Artist;
