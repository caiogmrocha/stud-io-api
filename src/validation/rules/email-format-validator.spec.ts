import { EmailFormatError } from "../errors/email-format-error";
import { EmailFormatValidator } from "./email-format-validator";

describe('[Unit] Email Format Validator', () => {
  it('should return EmailFormatError if the provided value is invalid', async () => {
    const suts = [
      new EmailFormatValidator('email', '@email.com').validate(),
      new EmailFormatValidator('email', '.com').validate(),
      new EmailFormatValidator('email', 'email@').validate(),
      new EmailFormatValidator('email', '@').validate(),
      new EmailFormatValidator('email', 'email').validate(),
    ];

    for await (const result of suts) {
      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(EmailFormatError);
    }
  });
});
