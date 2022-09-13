import fs, { promises as fsPromise } from "fs";
import path from "path";

export const moveFile = (currentFilePath: string, newFilePath: string) => {
  fs.rename(currentFilePath, newFilePath, (err) => {
    if (err) throw err;
    else console.log("move file success");
  });
};

export const deleteFile = async (path: string) => {
  try {
    await fsPromise.unlink(path);
  } catch (err) {
    if (err && err.code == "ENOENT") {
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      throw err;
    }
  }
};

export const generateFilePath = (fileExtension: string) => {
  const id = genereteUID();
  const servePath = (process.env.IMAGE_PATH || "") + `/${id}.${fileExtension}`;
  const realPath =
    (process.env.PUBLIC_PATH || "") +
    (process.env.IMAGE_PATH || "") +
    `/${id}.${fileExtension}`;
  return [servePath, realPath];
};

export const isSamePath = (path1: string, path2: string) =>
  path.resolve(path1.toLowerCase()) === path.resolve(path2.toLowerCase());

export const servePathToRealPath = (servePath: string) =>
  servePath ? path.join(process.env.PUBLIC_PATH || "public", servePath) : "";

export const genereteUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
