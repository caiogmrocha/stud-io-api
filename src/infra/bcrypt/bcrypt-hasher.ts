import { IBcryptHasherEncripter } from "@/app/contracts/cryptography/i-bcrypt-hasher";

import bcrypt from 'bcrypt';

export class BcryptHasher implements IBcryptHasherEncripter {
  async hash(text: string, salt: number = 10): Promise<string> {
    const hashedText = await bcrypt.hash(text, salt);

    return hashedText;
  }
}
