import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, './env'), '');
  const enableHttps = env.ENABLE_HTTPS && env.ENABLE_HTTPS === 'true';
  const enableProxyLog = env.ENABLE_PROXY_LOG && env.ENABLE_PROXY_LOG === 'true';
  const pluginList = [react(), tsconfigPaths(), nodePolyfills(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'My React App',
      short_name: 'ReactApp',
      description: 'My Awesome React App with PWA',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
      workbox: {
        // 특정 파일을 캐시하는 방법
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/.*\.(js|css|html|png|jpg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'my-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10
              }
            }
          },
          {
            urlPattern: /\/api\/.*\/data/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ],
        // 기본적으로 포함할 파일 지정
        globPatterns: [
          '**/*.{js,css,html,png,jpg,wasm}'
        ],
      }
  })];
  console.log('LOCAL_LINT : ' + env.LOCAL_LINT);
  const enableLintChekcer = env.LOCAL_LINT && env.LOCAL_LINT === 'Y';
  if (enableHttps) {
    pluginList.push(basicSsl());
  }
  if(enableLintChekcer) {
    pluginList.push(checker({typescript: true}));
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
