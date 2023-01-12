import bcrypt from 'bcrypt'

export async function hash(text: string | Buffer, salt: number): Promise<string> {
  return await bcrypt.hash(text, salt);
}
