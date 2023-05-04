export interface IDeleteProfileSubjectRepository {
  delete(profileId: string, subjectId: number): Promise<void>;
}
