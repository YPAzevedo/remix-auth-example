import { User } from '.prisma/client';
import { db } from './db.server';

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user) return user;
    return null;
  } catch {
    return null;
  }
}
