jest.mock('../nats-wrapper');

beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
});

beforeEach(async () => {
  jest.clearAllMocks();
});

afterEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {
  jest.clearAllMocks();
});
