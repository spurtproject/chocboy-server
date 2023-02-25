const request = require('supertest');
const { connectToDatabase } = require('../config/mongoose');
const User = require('../auth/user.model');

describe('Auth: Signup', () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should signup a user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .set('content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: 'Password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('userInfo');
    expect(response.body.userInfo).toHaveProperty('name', 'John Doe');
    expect(response.body.userInfo).toHaveProperty('email', 'johndoe@mail.com');
    expect(response.body.userInfo).toHaveProperty(
      'password',
      '$5k.wlifjoieihguhou90333333339'
    );
  });

  it('should login a user', async () => {
    // create user in out db
    const user = await User.create({
      email: 'johnny',
      password: 'password',
    });

    // login user
    const response = await request(app)
      .post('/api/auth/signin')
      .set('content-type', 'application/json')
      .send({
        email: 'johndoe@gmail.com',
        password: 'password',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
