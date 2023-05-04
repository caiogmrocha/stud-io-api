import * as esbuild from 'esbuild';

import tsconfigPaths from '@esbuild-plugins/tsconfig-paths';
import path from 'path';

esbuild.build({
	entryPoints: [
		path.resolve(__dirname, 'src', 'main', 'index.ts')
	],
	sourcemap: true,
	tsconfig: path.resolve(__dirname, 'tsconfig.json'),
	minify: true,
	bundle: true,
	outdir: 'dist',
	platform: 'node',
	plugins: [
		tsconfigPaths({}),
	],
	external: [
		'mock-aws-s3',
		'aws-sdk',
		'nock',
	],
})
.then(() => process.exit(0))
.catch(() => process.exit(1));
