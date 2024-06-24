const authController = require('../../controllers/authController');
const authService = require('../../services/authService');
const httpMocks = require("node-mocks-http");

jest.mock('../../services/authService');

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Auth Controller - Register', () => {
  it('should register a new user', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      role: 'user',
    };

    authService.registerUser.mockResolvedValue(req.body);

    await authController.register(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().message).toBe('User registered successfully');
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error registering user' };
    authService.registerUser.mockRejectedValue(errorMessage);

    await authController.register(req, res, next);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toBe(errorMessage.message);
  });
});

describe('Auth Controller - Login', () => {
  it('should login a user', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password',
    };

    authService.loginUser.mockResolvedValue('token');

    await authController.login(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res.cookies.token.value).toBe('token');
    expect(res._getJSONData().message).toBe('Logged in successfully');
  });

  it('should handle login errors', async () => {
    const errorMessage = { message: 'Email or password is incorrect' };
    authService.loginUser.mockRejectedValue(errorMessage);

    await authController.login(req, res, next);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().message).toBe(errorMessage.message);
  });
});
