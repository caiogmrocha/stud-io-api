import { workers } from "./config/queue";

(async (): Promise<void> => {
	try {
		Promise.all(workers.map((worker) => worker.run()));

		console.log(`Queue service is running at ${process.pid} process`);

		const exitSignal: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

		exitSignal.forEach((signal) => process.on(signal, async () => {
			console.log(`Queue service received signal: ${signal}, exiting gracefully...`);

			await Promise.all(workers.map((worker) => worker.close()));

			process.exit(0);
		}));
	} catch (error) {
		console.log('Queue service exited with status error: ', error);

		process.exit(1);
	}
})();
