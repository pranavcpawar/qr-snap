import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  stats: {
    builtIns: { ignore: ['fs', 'path', 'crypto'] },
  },
  polyfills: {
    buffer: true,
    stream: true,
    crypto: true,
    path: true,
  },
};

export default config;
