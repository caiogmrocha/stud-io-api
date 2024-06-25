import { IDeleteProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-delete-profile-subject-repository";

import { IN_MEMORY_DATABASE_PATH, getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { writeFile } from "fs/promises";

export class InMemoryDeleteProfileSubjectRepository implements IDeleteProfileSubjectRepository {
	async delete(profileId: string, subjectId: number): Promise<void> {
		const database = await getInMemoryDatabase();

		database.profile_subjects = database.profile_subjects.filter(profileSubject => !(
			profileSubject.profile_id === profileId &&
			profileSubject.subject_id === subjectId
		));

		await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));
	}
}
