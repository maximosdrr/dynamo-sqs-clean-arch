import bcrypt from "bcrypt";

export class HashLib {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(text, salt);
  }
  compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
