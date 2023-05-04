import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";
import { ProfilesOnSubjects as PrismaProfileSubject } from "@prisma/client";

export class ProfileSubjectMapper {
  static fromPrismaToModel(from: PrismaProfileSubject): IProfileSubjectModel {
    const profileSubject: IProfileSubjectModel = {
      profile_id: from.profileId,
			subject_id: from.subjectId,
			created_at: from.createdAt,
			updated_at: from.updatedAt || undefined,
    };

    return profileSubject;
  }
}
