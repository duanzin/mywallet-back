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
      saldo: 0,
      registros: [],
    });

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function loginController(req, res) {
  const email = req.body.email;
  const pass = req.body.password;
  try {
    const user = await db.collection("users").findOne({ email: email });

    const passmatch = await bcrypt.compare(pass, user.password);

    if (!passmatch || !user) {
      return res.send("Email ou senha incorretos");
    }

    const token = uuid();
    const session = { name: user.name, token };
    await db.collection("sessions").insertOne(session);

    console.log(session);
    res.status(200).send(session);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
