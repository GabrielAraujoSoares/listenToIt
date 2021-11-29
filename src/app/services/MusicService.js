import Album from "../models/Album";
import Artist from "../models/Artist";
import Music from "../models/Music";
import UserLike from "../models/UserLike";

export class MusicService {
  static async list(iduser) {
    try {
      const musicsDb = await Music.findAll();

      if (musicsDb.length > 0) {
        const musics = await Promise.all(
          musicsDb.map(async (music) => {
            const artistDb = await Artist.findByPk(music.idartist);

            if (!artistDb) {
              return null;
            }

            const albumDb = await Album.findOne({
              attributes: ["albumname"],
              where: {
                idartist: music.idartist,
              },
            });

            if (!albumDb) {
              return null;
            }

            const userLikeDb = await UserLike.findOne({
              where: {
                iduser,
                idmusic: music.idmusic,
              },
            });

            const userLike = await UserLike.findAll({
              where: {
                idmusic: music.idmusic,
              },
            });

            return {
              idMusic: music.idmusic,
              musicName: music.musicname,
              idArtist: music.idartist,
              artistName: artistDb.artistname,
              albumName: albumDb.albumname,
              idAlbum: music.idalbum,
              userLiked: userLikeDb ? true : false,
              likeCount: userLike ? userLike.length : 0,
              spotifyCode: music.spotifyCode,
              youtubeCode: music.youtubeCode,
              haveLyrics: music.havelyrics,
              createdAt: music.createdAt, // "2021-11-06T18:25:43.511Z",
              updatedAt: music.updatedAt, // "2021-11-06T18:25:43.511Z",
            };
          })
        );

        return musics.filter((item) => item);
      }

      return null;
    } catch (error) {
      console.log("(*) Exception on list musics: ", error);

      return null;
    }
  }
}
