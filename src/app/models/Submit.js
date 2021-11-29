import Sequelize, { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class Submit extends Model {
  static init(sequelize) {
    super.init(
      {
        idsubmit: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        idmusic: {
          type: DataTypes.INTEGER,
        },
        idalbum: {
          type: DataTypes.INTEGER,
        },
        iduser: {
          type: DataTypes.INTEGER,
        },
        musicname: {
          type: DataTypes.STRING,
        },
        artistname: {
          type: DataTypes.STRING,
        },
        albumname: {
          type: DataTypes.STRING,
        },
        lyricstext: {
          type: DataTypes.TEXT,
        },
        lyricslanguage: {
          type: DataTypes.STRING,
        },
        spotifycode: {
          type: DataTypes.STRING,
        },
        youtubecode: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.STRING,
        },
        isupdate: {
          type: DataTypes.BOOLEAN,
        },
        albumyear: {
          type: DataTypes.STRING,
        },
        idartist: {
          type: DataTypes.INTEGER,
        },
        submittype: {
          type: DataTypes.STRING,
        },
        idlyrics: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: "Submit",
        modelName: "Submit",
        updatedAt: false,
        createdAt: "createdat",
      }
    );

    return this;
  }
}

export default Submit;
