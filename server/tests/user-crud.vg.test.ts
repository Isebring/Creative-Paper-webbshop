import request, { SuperAgentTest } from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app';
import { MockDB, mockDB } from './mock';
import { expectDocumentListsToBeTheSame, loginUser } from './support/utils';

describe('User CRUD operations as admin', () => {
  let db: MockDB;
  let agent: SuperAgentTest;

  beforeEach(async () => {
    db = await mockDB();
    agent = request.agent(app);
    await loginUser(agent, 'admin@plugga.se');
  });

  it('should be possible get all users as admin (200)', async () => {
    const response = await agent.get('/api/users');
    // Assert response is correct
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.length).toBeDefined();

    // Assert user list is correct
    const dbUsers = [db.user, db.admin];
    const withoutPassword = dbUsers.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    expectDocumentListsToBeTheSame(response.body, withoutPassword);
  });

  it('should be possible to update role on a user as admin (200)', async () => {
    const { password, ...user } = db.user;
    user.isAdmin = true;

    const response = await agent
      .put('/api/users/' + user._id)
      .set('content-type', 'application/json')
      .send(user);

    // Assert response is correct
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.username).toEqual(user.username);
    expect(response.body.isAdmin).toEqual(user.isAdmin);

    // Assert user is updated in db
    const responseAll = await agent.get('/api/users');
    expect(responseAll.body.length).toBe([db.user, db.admin].length);
    expect(responseAll.body[0]).toStrictEqual(user);
  });

  it('should be possible to delete an user as admin (204)', async () => {
    const response = await agent
      .delete('/api/users/' + db.user._id)
      .set('content-type', 'application/json');

    // Assert response is correct
    expect(response.status).toBe(204);
    expect(response.headers['content-type']).toBeUndefined();

    //Assert post list is correct
    const { password, ...admin } = db.admin;
    const responseAll = await agent.get('/api/users');
    expect(responseAll.body.length).toBe(1);
    expect(responseAll.body[0]).toStrictEqual(admin);
  });
});
