import {defineConfig} from 'vite';
export default defineConfig({server:{proxy:{'/api':process.env.API_PROXY || 'http://localhost:8080'}}});
