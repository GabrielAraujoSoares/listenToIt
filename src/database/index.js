import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Submit from "../app/models/Submit";

const models = [User, Submit];

class Database {
  constructor() {
    this.init();
    this.check();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  async check() {
    try {
      await this.connection.authenticate();

      console.log("(*) Database is running");
    } catch (error) {
      console.error("Unable to connect on database. Error: ", error);
    }
  }
}

export default new Database();
