const authService = require('../../services/authService');
const authDao = require('../../daos/authDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../daos/authDao');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      role: 'user',
    };

    authDao.createUser.mockResolvedValue(userData);
    const user = await authService.registerUser(userData);

    expect(user.email).toBe('test@example.com');
  });

  it('should login a user', async () => {
    const user = {
      _id: '1234567890',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
    };

    authDao.findUserByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    const token = await authService.loginUser('test@example.com', 'password');

    expect(token).toBe('token');
  });
});
