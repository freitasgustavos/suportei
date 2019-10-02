import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('Cadastrar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Gustavo Freitas',
        email: 'freitasgustavof@gmail.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
