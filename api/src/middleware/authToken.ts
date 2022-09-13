import User from "entities/User";
import { asyncCatchErr } from "utils/asyncCatchErr";
import { InvalidTokenError } from "errors/customErrors";
import { getTokenFromRequest, verifyToken } from "utils/authToken";

export const authorizePrivateRoute = asyncCatchErr(async (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    throw new InvalidTokenError("Authentication token not found.");
  }

  const tokenDecoded = verifyToken(token);
  const userId = tokenDecoded.id;
  if (userId === (process.env.ADMIN_ID || "admin")) next();

  if (!userId) {
    throw new InvalidTokenError("Authentication token is invalid.");
  }
  const user = await User.findOneById(userId);
  if (!user) {
    throw new InvalidTokenError(
      "Authentication token is invalid: User not found."
    );
  }
  req.currentUser = user;
  next();
});

export const authorizePublicRoute = asyncCatchErr(async (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    next();
  } else {
    const tokenDecoded = verifyToken(token);
    const userId = tokenDecoded.id;

    if (!userId) {
      throw new InvalidTokenError("Authentication token is invalid.");
    }
    const user = await User.findOneById(userId);
    if (!user) {
      throw new InvalidTokenError(
        "Authentication token is invalid: User not found."
      );
    }
    req.currentUser = user;
    next();
  }
});
