import { Model, DataTypes } from "sequelize";

class UserLike extends Model {
  static init(sequelize) {
    super.init(
      {
        iduser: {
          type: DataTypes.INTEGER,
        },
        idmusic: {
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        idalbum: {
          type: DataTypes.INTEGER,
        },
        idartist: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "UserLike",
        modelName: "UserLike",
        updatedAt: false,
        createdAt: false,
      }
    );

    return this;
  }
}

export default UserLike;
