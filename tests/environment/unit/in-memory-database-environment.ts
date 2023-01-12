import { setupInMemoryDatabase } from "../../helpers/in-memory-database";

export class InMemoryDatabaseEnvironment {
  async setup(): Promise<void> {
    await setupInMemoryDatabase({
      profiles: [],
      students: [],
      teachers: [],
    });
  }

  async teardown(): Promise<void> {}
}
