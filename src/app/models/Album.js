import { Model, DataTypes } from "sequelize";

class Album extends Model {
  static init(sequelize) {
    super.init(
      {
        idalbum: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        createdat: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        idartist: {
          type: DataTypes.INTEGER,
        },
        albumname: DataTypes.STRING,
        albumyear: DataTypes.STRING,
        spotifycode: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "Album",
        modelName: "Album",
        updatedAt: false,
        createdAt: "createdat",
      }
    );

    return this;
  }
}

export default Album;
