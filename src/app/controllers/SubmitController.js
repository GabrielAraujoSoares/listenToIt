import * as Yup from "yup";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { UserService } from "../services/UserService";
import { SubmitService } from "../services/SubmitService";

import {
  Response,
  BadRequest,
  ServerError,
  Forbidden,
} from "../../utils/customResponse";

class SubmitController {
  async create(req, res) {
    const newSubmit = req.body;

    const { iduser } = req.user;

    const user = await UserService.getUserByPk(iduser);

    if (!user) {
      return new BadRequest(res, "Usuário não autenticado!", null);
    }

    if (newSubmit.ISUpdate) {
      if (!newSubmit.IDMusic) {
        return new BadRequest(res, "Música sem identificação!", null);
      }

      if (!newSubmit.IDAlbum) {
        return new BadRequest(res, "Álbum sem identificação!", null);
      }

      if (!newSubmit.IDArtist) {
        return new BadRequest(res, "Artista sem identificação!", null);
      }
    } else {
      if (!newSubmit.MusicName) {
        return new BadRequest(res, "Nome da música não está preenchida!", null);
      }

      if (!newSubmit.ArtistName) {
        return new BadRequest(
          res,
          "Nome do artista não está preenchido!",
          null
        );
      }

      if (!newSubmit.SpotifyCode) {
        return new BadRequest(res, "Código do spotify inválido!", null);
      }
    }

    newSubmit.iduser = iduser;

    const submit = await SubmitService.create(newSubmit);

    if (submit) {
      return new Response(res, "Envio realizado com sucesso!", submit);
    }

    return new ServerError(res, "Não foi possível realizar o envio!", null);
  }

  async get(req, res) {
    const { iduser, usertype } = req.user;

    if (usertype === "System") {
      return new Forbidden(res, "Não autorizado!", null);
    }

    let submits = [];

    if (usertype === "Admin") {
      submits = await SubmitService.get();
    } else {
      submits = await SubmitService.get(iduser);
    }

    if (submits.length > 0) {
      return new Response(res, "Submits listados com sucesso!", submits);
    }

    return new ServerError(res, "Não foi possível listar os submits!", submits);
  }

  async update(req, res) {
    const { usertype } = req.user;

    if (usertype !== "Admin") {
      return new Forbidden(res, "Não autorizado!", null);
    }

    const submitUpdated = await SubmitService.update(req.body);

    if (submitUpdated) {
      return new Response(res, "Atualizado com sucesso!", submitUpdated);
    }

    return new ServerError(res, "Não foi possível atualizar o submit", null);
  }
}

export default new SubmitController();
