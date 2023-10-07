import { env } from "@/utils/env";
import { app } from "./config/http";

(async (): Promise<void> => {
	try {
		const server = app.listen(env.HTTP_PORT, () => console.log(`Web API service is running at http://${env.HTTP_HOST}:${env.HTTP_PORT}`));

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
