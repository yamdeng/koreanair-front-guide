import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, './env'), '');
  const enableHttps = env.ENABLE_HTTPS && env.ENABLE_HTTPS === 'true';
  const enableProxyLog = env.ENABLE_PROXY_LOG && env.ENABLE_PROXY_LOG === 'true';
  const pluginList = [react(), tsconfigPaths(), nodePolyfills()];
  if (enableHttps) {
    pluginList.push(basicSsl());
  }
  const VITE_API_LOCAL_URL = env.VITE_API_LOCAL_URL;
  const VITE_API_URL = env.VITE_API_URL;
  const currentFolderPath = resolve(__dirname);
  console.log(`mode : ${mode}`);
  console.log(`currentFolderPath : ${currentFolderPath}`);
  console.log(`loadEnv env VITE_API_URL : ${env.VITE_API_URL}`);
  console.log(`enableProxyLog : ${env.ENABLE_PROXY_LOG}`);
  console.log(`enableHttps : ${env.ENABLE_HTTPS}`);
  console.log(`VITE_API_LOCAL_URL : ${VITE_API_LOCAL_URL}`);
  console.log(`VITE_API_URL : ${VITE_API_URL}`);

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
    resolve: {
      alias: {
        fs: 'rollup-plugin-node-polyfills/polyfills/fs',
        path: 'path-browserify',
        crypto: 'crypto-browserify',
      }
    },
    server: {
      strictPort: false,
      open: true,
      host: '0.0.0.0', // 모든 IP에서 접근 가능하도록 설정
      proxy: {
        '/api/v1': {
          target: VITE_API_LOCAL_URL ? VITE_API_LOCAL_URL : VITE_API_URL,
          changeOrigin: false,
          configure: (proxy: any, _options: any) => {
            proxy.on('error', (err: any, _req: any, _res: any) => {
              if (enableProxyLog) {
                console.log('proxy error', err);
              }
            });
            proxy.on('proxyReq', (proxyReq: any, req: { method: any; url: any }, _res: any) => {
              console.log('Sending Request to the Target:', req.method, req.url);
              if (enableProxyLog) {
                console.log('Sending Request to the Target:', req.method, req.url);
              }
            });
            proxy.on('proxyRes', (proxyRes: { statusCode: any }, req: { url: any }, _res: any) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              if (enableProxyLog) {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              }
            });
          }
        },
      },
    },
  };
});
