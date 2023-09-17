import { workers } from "./config/queue";

(async (): Promise<void> => {
	try {
		await Promise.all(workers.map((worker) => worker.run()));

		const exitSignal: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

		exitSignal.forEach((signal) => process.on(signal, async () => {
			console.info(`Queue service received signal: ${signal}, exiting gracefully...`);

			await Promise.all(workers.map((worker) => worker.close()));

			process.exit(0);
		}));
	} catch (error) {
		console.info('Queue service exited with status error: ', error);

		process.exit(1);
	}
})();
