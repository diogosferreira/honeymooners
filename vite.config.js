import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		host: 'localhost',
		port: 3001,
		cors: true,
		hmr: {
			host: 'localhost',
			protocol: 'ws',
		},
	},
	build: {
		minify: true,
		manifest: true,
		rollupOptions: {
			input: './src/app.js',
			output: {
				format: 'umd',
				entryFileNames: 'main.js',
				esModule: false,
				compact: true,
			},
		},
	},
})
