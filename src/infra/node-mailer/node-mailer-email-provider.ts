import { CanNotSendEmailError } from '@/app/contracts/email/errors/can-not-send-email-error';
import { ISendEmailProvider, ISendEmailProviderInputBoundary, ISendEmailProviderOutputBoundary } from '@/app/contracts/email/i-send-email-provider';
import { env } from '@/utils/env';
import { left, right } from '@/utils/logic/either';

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export class NodeMailerEmailProvider implements ISendEmailProvider {
	async send(input: ISendEmailProviderInputBoundary): Promise<ISendEmailProviderOutputBoundary> {
		try {
			await transporter.sendMail({
				from: input.from,
				to: input.to,
				subject: input.subject,
				html: input.body,
			});

			return right(undefined);
		} catch (error) {
			return left(new CanNotSendEmailError('Não foi possível enviar o email.'));
		}
	}
}
