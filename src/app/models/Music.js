import { Model, DataTypes } from "sequelize";

class Music extends Model {
  static init(sequelize) {
    super.init(
      {
        idmusic: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        musicname: {
          type: DataTypes.STRING,
        },
        idartist: DataTypes.INTEGER,
        idalbum: {
          type: DataTypes.INTEGER,
        },
        spotifycode: DataTypes.STRING,
        youtubecode: {
          type: DataTypes.STRING,
        },
        havelyrics: {
          type: DataTypes.BOOLEAN,
        },
      },
      {
        sequelize,
        tableName: "Music",
        modelName: "Music",
        updatedAt: "updatedat",
        createdAt: "createdat",
      }
    );

    return this;
  }
}

export default Music;
