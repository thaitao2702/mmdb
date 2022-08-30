declare namespace Express {
  export interface Response {
    response: { success: boolean; data: any };
  }
  export interface Request {
    currentUser: import("entities").User;
    tempFile: {
      previousFilePath?: string;
      tempFilePath?: string;
      newFilePath?: string;
      newFileExtension?: string;
    };
  }
}
