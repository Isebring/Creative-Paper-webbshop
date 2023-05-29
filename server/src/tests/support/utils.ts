import { Document } from 'mongoose';
import { SuperAgentTest, SuperTest } from 'supertest';
import { expect } from 'vitest';

export function toJSON<T extends Document>(document: T | null) {
  if (!document) return document;
  return JSON.parse(JSON.stringify(document.toJSON()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sorted<T extends { _id: any }>(document: T[]): T[] {
  return document.sort((a, b) => (a._id > b._id ? 1 : -1));
}

export async function loginUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agent: SuperAgentTest | SuperTest<any>,
  email = 'user@plugga.se',
  password = '123123',
) {
  return await agent
    .post('/api/users/login')
    .set('content-type', 'application/json')
    .send({ email, password });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function expectDocumentListsToBeTheSame<T extends { _id: any }>(
  list: T[],
  otherlist: T[],
) {
  const sortedList = sorted(list);
  expect(otherlist.length).toBe(list.length);
  sorted(otherlist).forEach((item, index) => {
    expect(item).toStrictEqual(sortedList[index]);
  });
}
