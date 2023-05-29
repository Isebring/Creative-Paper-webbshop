import { User } from '../..';
import { clearUsersCollection, insertMockAdmin, insertMockUser } from './users';

export type MockDB = {
  user: User;
  admin: User;
};

/** Resets the database and returns the inserted users and posts */
export async function mockDB(): Promise<MockDB> {
  await clearUsersCollection();

  const user = await insertMockUser();
  const admin = await insertMockAdmin();

  return { user, admin };
}
