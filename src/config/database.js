module.exports = {
  dialect: "postgres",
  host: "ec2-34-203-182-172.compute-1.amazonaws.com",
  username: "afyfwcycizliik",
  password: "f8b517c9a9b6f85e3341467bda2c288be57c4521d88e478f80090baa3ae58199",
  database: "d52dl7t6iaqbl3",
  port: "5432",
  logging: false,
  define: {
    timestamps: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
