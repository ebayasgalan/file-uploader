const request = require('supertest');

const port = 3000;

// photo routes

describe('/photo', () => {
  it('sends get request', (data) => {
    request(`localhost:${port}`)
      .get(`/photo`)
      .expect(200, data);
  });
});

