import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/green-chat/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			pages: path.resolve(__dirname, './src/pages/'),
			components: path.resolve(__dirname, './src/components/'),
			utils: path.resolve(__dirname, './src/utils/'),
		},
	},
})
