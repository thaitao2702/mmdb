import { createEntity, findEntity } from "./entityHandler";
import { User } from "entities";

export const initAdmin = async () => {
  const adminInstance = await findEntity(User, { where: { name: "admin" } });
  if (!adminInstance) {
    const adminData = {
      name: "admin",
      email: process.env.ADMIN_MAIL || "admin@mail.com",
      password: process.env.MASTER_PW || "123456789",
    };
    try {
      createEntity(User, adminData);
    } catch (error) {}
  } else return adminInstance;
};
