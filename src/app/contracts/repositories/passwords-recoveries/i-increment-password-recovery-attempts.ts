export interface IIncrementPasswordRecoveryAttemptsRepository {
	increment(id: string): Promise<number>;
}
