import Sequelize, { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        iduser: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        username: {
          type: DataTypes.STRING,
        },
        email: DataTypes.STRING,
        usertype: {
          type: DataTypes.STRING,
        },
        image: DataTypes.STRING,
        passwordhash: {
          type: DataTypes.STRING,
        },
        userscore: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: "User",
        modelName: "User",
        updatedAt: false,
        createdAt: "createdat",
      }
    );

    // Trechos de código executados de maneira automática baseado em ações no model
    // 'beforeSave' faz com que antes de qualquer save no users, execute o hook
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.File, {
  //     foreignKey: "avatar_id",
  //   });
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordhash);
  }
}

export default User;
