import Submit from "../models/Submit";

export class SubmitService {
  static async create(submit) {
    try {
      const submitDb = await Submit.create(submit);

      return submitDb;
    } catch (error) {
      console.log("(*) Exception on create submit: ", error);

      return null;
    }
  }

  static async get(iduser = null) {
    try {
      let submits = [];

      if (iduser) {
        submits = await Submit.findAll({
          where: {
            iduser,
          },
        });

        return submits;
      }

      submits = await Submit.findAll();

      return submits;
    } catch (error) {
      console.log("(*) Exception on get submits: ", error);

      return null;
    }
  }

  static async update(submitToUpdate) {
    try {
      const submitUpdated = await Submit.update(submitToUpdate, {
        where: { idsubmit: submitToUpdate.idsubmit },
      });

      return submitUpdated;
    } catch (error) {
      console.log("(*) Exception on update submit: ", error);

      return null;
    }
  }
}
