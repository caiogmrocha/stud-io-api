import { Either } from "@/utils/logic/either";
import { CanNotSendEmailError } from "./errors/can-not-send-email-error";

export type ISendEmailProviderInputBoundary = {
	to: string;
	from: string;
	subject: string;
	body: string;
}

export type ISendEmailProviderOutputBoundary = Either<CanNotSendEmailError, void>;

export interface ISendEmailProvider {
	send(input: ISendEmailProviderInputBoundary): Promise<ISendEmailProviderOutputBoundary>;
}
