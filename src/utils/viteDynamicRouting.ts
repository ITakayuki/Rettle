import path from "node:path";
import * as glob from "glob";
import { config } from "./config";
import { compileDynamicTsx } from "./viteCompileTsxFile";

const getDynamicRootFiles = () => {
  const files = glob.sync(
    path.resolve(path.join("./", config.root, "./**/*[[]*[]]*/*")),
    {
      nodir: true,
    }
  );
  return files;
};

const getTargetFileData = (filePath: string) => {
  const result = {
    path: "",
    id: "",
  };
  const files = getDynamicRootFiles();
  const pattern = /\[(.*?)\]/g;
  const requestPathArray = path.dirname(filePath).split("/");
  result.id = requestPathArray[requestPathArray.length - 1];
  const replaceReg = new RegExp(
    filePath.replace(result.id, "[[]|[]]").replace(path.extname(filePath), ""),
    "g"
  );
  for (const file of files) {
    if (replaceReg.test(file)) {
      result.path = file;
    }
  }
  return result;
};

const checkDynamicRoute = (request: string) => {
  const files = getDynamicRootFiles();
  const requestPathArray = path.dirname(request).split("/");
  const nearDir = requestPathArray[requestPathArray.length - 1];
  const replaceReg = new RegExp(
    request.replace(nearDir, "[[]|[]]").replace(path.extname(request), ""),
    "g"
  );
  for (const file of files) {
    if (replaceReg.test(file)) {
      return true;
    }
  }
  return false;
};

const viteDynamicRouting = async (request: string) => {
  const fileData = getTargetFileData(request);
  if (fileData) {
    try {
      const result = await compileDynamicTsx(fileData.path, fileData.id);
      return await Promise.resolve(result);
    } catch (e) {
      return await Promise.reject(e);
    }
  } else {
    return await Promise.reject();
  }
};

export { viteDynamicRouting, checkDynamicRoute };
