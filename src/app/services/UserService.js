import jwt from "jsonwebtoken";
import moment from "moment";
import { Op } from "sequelize";
import authConfig from "../../config/auth";
import User from "../models/User";

export class UserService {
  static async auth(email, password) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return {
          token: null,
          error: "Usuário não encontrado!",
          status: 400,
        };
      }

      if (!(await user.checkPassword(password))) {
        return {
          token: null,
          error: "Senha inválida",
          status: 400,
        };
      }

      return {
        token: jwt.sign(
          {
            iduser: user.iduser,
            usertype: user.usertype,
            createdAt: moment().format(),
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        ),
      };
    } catch (e) {
      console.log("(!) Exceção: ", e);

      return {
        token: null,
        error: "Erro interno!",
        status: 500,
      };
    }
  }

  static async getUserByPk(idUser) {
    try {
      const user = await User.findByPk(idUser);

      return user;
    } catch (error) {
      console.log("(*) Exception no get user by pk: ", error);

      return null;
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });

      return user;
    } catch (error) {
      console.log("(*) Exception on get use by email: ", error);

      return null;
    }
  }

  static async create(user) {
    try {
      const { iduser, username, email, usertype, image, userscore } =
        await User.create(user);

      return {
        iduser,
        username,
        email,
        usertype,
        image,
        userscore,
      };
    } catch (error) {
      console.log("(*) Exception on create user: ", error);

      return null;
    }
  }

  static async update(userToUpdate) {
    try {
      const { iduser, username, email, usertype, image, userscore } =
        await User.update(userToUpdate);

      return {
        iduser,
        username,
        email,
        usertype,
        image,
        userscore,
      };
    } catch (error) {
      console.log("(*) Exception on update user: ", error);

      return null;
    }
  }

  static async list(userName = null) {
    try {
      let users = [];

      if (userName) {
        users = await User.findAll({
          where: {
            [Op.iLike]: "%" + userName + "%",
          },
        });
      } else {
        users = await User.findAll();
      }

      return users;
    } catch (error) {
      console.log("(*) Exception on list user: ", error);

      return null;
    }
  }
}
