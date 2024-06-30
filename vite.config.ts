import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, './env'), '');
  const enableHttps = env.ENABLE_HTTPS && env.ENABLE_HTTPS === 'true';
  const pluginList = [react(), tsconfigPaths()];
  if (enableHttps) {
    pluginList.push(basicSsl());
  }
  const VITE_LOCAL_URL = env.VITE_LOCAL_URL;
  console.log(`VITE_LOCAL_URL : ${VITE_LOCAL_URL}`);
  const currentFolderPath = resolve(__dirname);

  return {
    define: {
      __PROJECT_FOLDER_PATH: JSON.stringify(currentFolderPath),
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    base: '/',
    envDir: './env',
    plugins: pluginList,
    server: {
      strictPort: true,
      open: true,
      proxy: {
        '/api': {
          target: VITE_LOCAL_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
