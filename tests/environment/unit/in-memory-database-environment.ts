import { setupInMemoryDatabase } from "../../helpers/in-memory-database";

export class InMemoryDatabaseEnvironment {
  async setup(): Promise<void> {
    await setupInMemoryDatabase({
      profiles: [],
      students: [],
      teachers: [],
			profile_subjects: [],
			subjects: [],
    });
  }

  async teardown(): Promise<void> {
		await setupInMemoryDatabase({
			profile_subjects: [],
			profiles: [],
			students: [],
			subjects: [],
			teachers: [],
		});
	}
}
