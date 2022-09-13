import { Request } from "express";
import jsonwebtoken from "jsonwebtoken";
import { isPlainObject } from "lodash";

import { InvalidTokenError } from "errors/customErrors";

export const getTokenFromRequest = (req: Request) => {
  const header = req.get("Authorization") || "";
  const [bearer, token] = header.split(" ");
  return bearer === "Bearer" && token ? token : null;
};

export const createAuthenticationToken = (id: number | string) =>
  jsonwebtoken.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "24h" });

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET || ""
    );
    if (isPlainObject(decodedToken)) {
      return decodedToken as { [key: string]: any };
    }
    throw new Error();
  } catch (err) {
    throw new InvalidTokenError();
  }
};
