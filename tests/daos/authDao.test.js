const mongoose = require('mongoose');
const authDao = require('../../daos/authDao');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth DAO', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      role: 'user',
    };

    const user = await authDao.createUser(userData);
    expect(user).toHaveProperty('_id');
    expect(user.email).toBe('test@example.com');
  });

  it('should find a user by email', async () => {
    const user = await authDao.findUserByEmail('test@example.com');
    expect(user).toHaveProperty('_id');
    expect(user.email).toBe('test@example.com');
  });
});
