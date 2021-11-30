import Music from "../models/Music";
import UserLike from "../models/UserLike";

export class UserLikeService {
  static async like(musicId, userId) {
    try {
      const userLikeDb = await UserLike.findOne({
        where: {
          iduser: userId,
          idmusic: musicId,
        },
      });

      if (userLikeDb) {
        await UserLike.destroy({
          where: {
            iduser: userId,
            idmusic: musicId,
          },
        });
      } else {
        const musicDb = await Music.findOne({
          attributes: ["idartist", "idalbum"],
          where: {
            idmusic: musicId,
          },
        });

        const userLikeToCreate = {
          iduser: userId,
          idmusic: musicId,
          idalbum: musicDb.idartist,
          idartist: musicDb.idalbum,
        };

        await UserLike.create(userLikeToCreate);
      }

      return true;
    } catch (error) {
      console.log("(*) Exception on like: ", error);

      return null;
    }
  }
}
