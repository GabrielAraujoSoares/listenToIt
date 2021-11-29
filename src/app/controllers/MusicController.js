import Music from "../models/Music";

import { MusicService } from "../services/MusicService";

import { Response, BadRequest, ServerError } from "../../utils/customResponse";

class MusicController {
  async list(req, res) {
    const { iduser } = req.user;

    const musics = await MusicService.list(iduser);

    if (!musics) {
      return new ServerError(res, "Não foi possível listar as músicas!", null);
    }

    return new Response(res, "Músicas listadas com sucesso!", musics);
  }
}

export default new MusicController();
