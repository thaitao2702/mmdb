import CryptoJS from "crypto-js";

import User from "entities/User";
import { findEntity, createEntity } from "utils/entityHandler";
import { asyncCatchErr } from "utils/asyncCatchErr";
import {
  InvalidLoginError,
  UserAlreadyExistedError,
} from "errors/customErrors";
import { createAuthenticationToken } from "utils/authToken";
import { UserRole } from "const/auth";

export const login = asyncCatchErr(async (req, res) => {
  const { password, email }: { password: string; email: string } = req.body;

  const user = await findEntity(User, { where: { email } });
  if (!user) throw new InvalidLoginError();

  if (email === process.env.ADMIN_MAIL && password === process.env.MASTER_PW) {
    const token = createAuthenticationToken(user.id);
    return res.status(200).send({
      user: { name: user.name, id: user.id },
      token,
      userRole: UserRole.Admin,
    });
  }

  const decryptedPass = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASSWORD_SECRET_KEY || ""
  ).toString(CryptoJS.enc.Utf8);
  if (decryptedPass !== password) throw new InvalidLoginError();

  user.password = "";
  const token = createAuthenticationToken(user.id);
  res.status(200).send({
    user,
    token,
    userRole: UserRole.User,
  });
});

export const signUp = asyncCatchErr(async (req, res) => {
  const { password, email } = req.body;
  let user = await findEntity(User, { where: { email } });
  if (user) throw new UserAlreadyExistedError();

  const encryptedPass = CryptoJS.AES.encrypt(
    password,
    process.env.PASSWORD_SECRET_KEY || ""
  ).toString();
  user = await createEntity(User, { ...req.body, password: encryptedPass });

  user.password = "";
  const token = createAuthenticationToken(user.id);
  res.status(200).send({
    user,
    token,
    userRole: UserRole.User,
  });
});
