import db from "../config/database.js";
import dayjs from "dayjs";

export async function userWallet(req, res) {
  const { name } = res.locals.session;

  const user = await db.collection("users").findOne({
    name,
  });
  if (user) {
    delete user.password;
    delete user.email;
    res.send(user);
  } else {
    res.sendStatus(401);
  }
}

export async function updateWallet(req, res) {
  const { name } = res.locals.session;

  const { value, description, type } = req.body;

  const carteira = await db.collection("users").findOne({ name });

  const registro = {
    value,
    description,
    type,
    date: dayjs().format("DD/MM"),
  };

  if (type === "entrada") {
    carteira.saldo += Number(value);
  } else {
    carteira.saldo -= Number(value);
  }

  carteira.saldo = carteira.saldo.toFixed(2);
  carteira.registros.push(registro);

  await db
    .collection("users")
    .updateOne(
      { name },
      { $set: { saldo: carteira.saldo, registros: carteira.registros } }
    );

  res.sendStatus(201);
}
