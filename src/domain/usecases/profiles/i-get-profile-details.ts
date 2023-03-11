import { Profile } from "@/domain/entities";
import { Either } from "@/utils/logic/either";

export type IGetProfileDetailsUseCaseInputBoundary = {
  profileId: string;
}

export type IGetProfileDetailsUseCaseOutputBoundary = Profile;

export interface IGetProfileDetailsUseCase {
  execute(input: IGetProfileDetailsUseCaseInputBoundary): Promise<Either<
    Error,
    IGetProfileDetailsUseCaseOutputBoundary
  >>;
}
