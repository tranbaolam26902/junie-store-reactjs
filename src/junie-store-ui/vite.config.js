import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@public': `${path.resolve(__dirname, './public/')}`,
            '~': path.resolve(__dirname, './src/'),
            '@assets': `${path.resolve(__dirname, './src/assets/')}`,
            '@components': `${path.resolve(__dirname, './src/components/')}`,
            '@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
            '@pages': path.resolve(__dirname, './src/pages'),
            '@redux': path.resolve(__dirname, './src/redux'),
            '@services': `${path.resolve(__dirname, './src/services')}`
        }
    }
});
