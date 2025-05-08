const path = './package.json';
const file = Bun.file(path);

export const pkgConfig = {
  APP_NAME: (await file.json()).name,
  APP_VERSION: (await file.json()).version,
};
