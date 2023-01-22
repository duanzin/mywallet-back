import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../config/database.js";

export async function cadastroController(req, res) {
  const passHash = bcrypt.hashSync(req.body.password, 10);

  try {
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: passHash,
    });
    await db.collection("wallet").insertOne({
      name: req.body.name,
      saldo: 0,
      registros: [],
    });

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function loginController(req, res) {
  try {
    const user = await db.collection("users").findOne(req.body.email);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = uuidV4();

      await db.collection("sessions").insertOne({ name: user.name, token });

      res.status(200).send(session);
    } else {
      return res.send("Usuário ou senha incorretos");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
