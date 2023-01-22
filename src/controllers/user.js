import db from "../config/database.js";

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
