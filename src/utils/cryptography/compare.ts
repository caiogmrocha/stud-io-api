import bcrypt from 'bcrypt'

export async function compare(comparable: string, comparing: string): Promise<boolean> {
  return await bcrypt.compare(comparable, comparing)
}
