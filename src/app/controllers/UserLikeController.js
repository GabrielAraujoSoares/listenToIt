import { BadRequest, Response } from "../../utils/customResponse";
import { UserLikeService } from "../services/UserLikeService";

class UserLikeController {
  async like(req, res) {
    const { idMusic, idUser } = req.params;

    if (!idMusic || !idUser) {
      return new BadRequest(res, "Validation fails", null);
    }

    const liked = await UserLikeService.like(idMusic, idUser);

    if (!liked) {
      return new BadRequest(res, "Não foi possível usar o like!", null);
    }

    return new Response(res, "Like com sucesso!", liked);
  }
}

export default new UserLikeController();
