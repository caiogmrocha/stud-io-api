import { writeFile } from "fs/promises";
import path from "path";

export class InMemoryDatabaseEnvironment {
  private filePath: string;

  constructor (filePath?: string) {
    this.filePath = filePath || path.resolve(__dirname, '..', '..', 'mocks', 'infra', 'database', 'database.json');
  }

  async setup(): Promise<void> {
    await writeFile(this.filePath, JSON.stringify({}));
  }

  async teardown(): Promise<void> {}
}
