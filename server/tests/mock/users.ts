import { User, UserModel } from '../../src';
import { toJSON } from '../support/utils';

export function getMockUser(
  email = 'user@plugga.se',
  password = 123123,
  isAdmin = false,
) {
  return {
    email,
    password,
    isAdmin,
  };
}

export async function insertMockUser() {
  const user = new UserModel(getMockUser());
  await user.save();
  return toJSON(user) as User;
}

export async function insertMockAdmin() {
  const user = new UserModel(getMockUser('admin@plugga.se', 123123, true));
  await user.save();
  return toJSON(user) as User;
}

export async function clearUsersCollection() {
  await UserModel.deleteMany({});
}
