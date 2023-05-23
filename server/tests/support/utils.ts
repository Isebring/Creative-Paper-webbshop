import { Document } from 'mongoose';
import { SuperAgentTest, SuperTest } from 'supertest';
import { expect } from 'vitest';

export function toJSON<T extends Document>(document: T | null) {
  if (!document) return document;
  return JSON.parse(JSON.stringify(document.toJSON()));
}

export function sorted<T extends { _id: any }>(document: T[]): T[] {
  return document.sort((a, b) => (a._id > b._id ? 1 : -1));
}

export async function loginUser(
  agent: SuperAgentTest | SuperTest<any>,
  email = 'user@plugga.se',
  password = '123123',
) {
  return await agent
    .post('/api/users/login')
    .set('content-type', 'application/json')
    .send({ email, password });
}

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
