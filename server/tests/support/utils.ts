import { Document } from 'mongoose';
import { SuperAgentTest, SuperTest } from 'supertest';
import { expect } from 'vitest';
import { Post } from '../../src';

export function toJSON<T extends Document>(document: T | null) {
  if (!document) return document;
  return JSON.parse(JSON.stringify(document.toJSON()));
}

export function sorted<T extends { _id: any }>(document: T[]): T[] {
  return document.sort((a, b) => (a._id > b._id ? 1 : -1));
}

export async function loginUser(
  agent: SuperAgentTest | SuperTest<any>,
  username = 'user@plugga.se',
  password = '123123'
) {
  return await agent
    .post('/api/users/login')
    .set('content-type', 'application/json')
    .send({ username, password });
}

export function expectDocumentListsToBeTheSame<T extends { _id: any }>(
  list: T[],
  otherlist: T[]
) {
  const sortedList = sorted(list);
  expect(otherlist.length).toBe(list.length);
  sorted(otherlist).forEach((item, index) => {
    expect(item).toStrictEqual(sortedList[index]);
  });
}

export function expectPostListsToBeTheSame(posts: Post[], dbPosts: Post[]) {
  const sortedList = sorted(posts);
  expect(dbPosts.length).toBe(posts.length);
  sorted(dbPosts).forEach((post, index) => {
    expectPostsToBeTheSame(post, sortedList[index]);
  });
}

export function expectPostsToBeTheSame(post: Post, dbPost: Post) {
  expect(post._id).toBe(dbPost._id);
  expect(post.title).toBe(dbPost.title);
  expect(post.content).toBe(dbPost.content);
  expect((post.author as any)?._id || post.author).toBe(
    (dbPost.author as any)?._id || dbPost.author
  );
  expect(post.createdAt).toBe(dbPost.createdAt);
}
