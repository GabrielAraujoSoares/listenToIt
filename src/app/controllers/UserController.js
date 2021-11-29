import * as Yup from "yup";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { UserService } from "../services/UserService";

import { Response, BadRequest, ServerError } from "../../utils/customResponse";

class UserController {
  async auth(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required(),
        passwordhash: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return new BadRequest(res, "Validation fails", null);
      }

      const { email, passwordhash } = req.body;

      const token = await UserService.auth(email, passwordhash);

      if (token.token) {
        return new Response(
          res,
          "Usuário autenticado com sucesso!",
          token.token
        );
      }

      switch (token.status) {
        case 500:
          return new ServerError(res, "Ocorreu um erro", token.error);
        case 400:
          return new BadRequest(res, token.error, null);
      }

      return new ServerError(res, "Ocorreu um erro", token.error);
    } catch (e) {
      console.log("(*) Exception: ", e);

      return new ServerError(res, "Ocorreu um erro", e);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      passwordhash: Yup.string().required().min(6),
      image: Yup.string().notRequired(),
      usertype: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return new BadRequest(res, "Validation fails!", null);
    }

    const userExists = await UserService.getUserByEmail(req.body.email);

    if (userExists) {
      return new BadRequest(res, "Usuário já existe!", null);
    }

    const user = await UserService.create(req.body);

    // Montar envio de email de boas vindas (Segunda fase)

    return new Response(res, "Usuário cadastrado com sucesso!", user);
  }

  async update(req, res) {
    const { iduser } = req.user;

    const userToUpdate = req.body;

    const user = await UserService.getUserByPk(iduser);

    if (userToUpdate.email && userToUpdate.email !== user.email) {
      const userExists = await UserService.getUserByEmail(userToUpdate.email);

      if (userExists) {
        return new BadRequest(res, "Usuário já existe!", null);
      }
    }

    const userUpdated = await UserService.update(userToUpdate);

    return new Response(res, "Usuário cadastrado com sucesso!", userUpdated);
  }

  async list(req, res) {
    const { userName } = req.query;

    const users = await UserService.list(userName);

    if (users) {
      return new Response(res, "Usuários listados com sucesso!", users);
    }

    return new BadRequest(res, "Não foi possível listar os usuários!", null);
  }

  async get(req, res) {
    const { iduser, usertype } = req.user;

    const { id } = req.params;

    let user = null;

    if (usertype === "System") {
      user = await UserService.getUserByPk(id);
    }

    if (usertype === "User") {
      user = await UserService.getUserByPk(iduser);
    }

    if (user) {
      return new Response(res, "Usuário encontrado com sucesso!", user);
    }

    return new BadRequest(res, "Não foi possível encontrar o usuário!", null);
  }
}

export default new UserController();
