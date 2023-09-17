import { app } from "./config/http";

const HOST = process.env.HTTP_HOST;
const PORT = process.env.HTTP_PORT;

(async (): Promise<void> => {
	try {
		const server = app.listen(PORT, () => console.log(`Server is running at http://${HOST}:${PORT}`));

		const exitSignal: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

		exitSignal.forEach((signal) => process.on(signal, async () => {
			console.info(`Web API service received signal: ${signal}, exiting gracefully...`);

			server.close();

			process.exit(0);
		}));
	} catch (error) {
		console.info('Web API service exited with status error: ', error);

		process.exit(1);
	}
})();
