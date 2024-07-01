const baseFilePath = '/src/components/guide/';
const profileFolderPath = __PROJECT_FOLDER_PATH;
const hrefBasePath = `vscode://file/${profileFolderPath}${baseFilePath}`;

const Config = {
  reactFileExtension: '.tsx',
  hrefBasePath: hrefBasePath,
  defaultGridHeight: 500,
};

export default Config;
