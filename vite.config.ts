import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, './env'), '');
  const enableHttps = env.ENABLE_HTTPS && env.ENABLE_HTTPS === 'true';
  const enableProxyLog = env.ENABLE_PROXY_LOG && env.ENABLE_PROXY_LOG === 'true';
  const pluginList = [react(), tsconfigPaths()];
  if (enableHttps) {
    pluginList.push(basicSsl());
  }
  const VITE_API_LOCAL_URL = env.VITE_API_LOCAL_URL;
  const currentFolderPath = resolve(__dirname);
  console.log(`mode : ${mode}`);
  console.log(`currentFolderPath : ${currentFolderPath}`);
  console.log(`loadEnv env VITE_API_URL : ${env.VITE_API_URL}`);
  console.log(`enableProxyLog : ${env.ENABLE_PROXY_LOG}`);
  console.log(`enableHttps : ${env.ENABLE_HTTPS}`);
  console.log(`VITE_API_LOCAL_URL : ${VITE_API_LOCAL_URL}`);

  return {
    define: {
      __PROJECT_FOLDER_PATH: JSON.stringify(currentFolderPath),
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
        },
      },
    },
    base: '/',
    envDir: './env',
    plugins: pluginList,
    server: {
      strictPort: false,
      open: true,
      proxy: {
        '/api/v1': {
          target: VITE_API_LOCAL_URL,
          changeOrigin: false,
          configure: (proxy: any, _options: any) => {
            proxy.on('error', (err: any, _req: any, _res: any) => {
              if(enableProxyLog) {
                console.log('proxy error', err);
              }          
            });
            proxy.on('proxyReq', (proxyReq: any, req: { method: any; url: any }, _res: any) => {
              console.log('Sending Request to the Target:', req.method, req.url);
              if(enableProxyLog) {
                console.log('Sending Request to the Target:', req.method, req.url);
              }          
            });
            proxy.on('proxyRes', (proxyRes: { statusCode: any }, req: { url: any }, _res: any) => {          
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              if(enableProxyLog) {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              }
            });
          }
        },
      },
    },
  };
});
