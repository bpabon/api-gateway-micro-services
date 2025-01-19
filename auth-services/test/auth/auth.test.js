import request from 'supertest';
import { testServer } from '../test-server';
import { jest } from '@jest/globals';
import { UserService } from '../../src/services/user/user.service';
import { AppDataSource } from '../../src/db/postgresql/ormconfig';


describe('Auth routes testing', () => {
    const newUser = {
        email: "example_test@example.com",
        password: "12345678"
    };
    beforeAll(async () => {
        const userService = new UserService();
        await testServer.start();
        userService.deleteAll();
    });
    afterAll(async () => {
        if (testServer.app) {
            testServer.close();
            await AppDataSource.destroy(); // Cerrar la conexión con la base de datos
          }
    });

    test('Create a new user for login auth/v1/api/registerUser', async () => {
        await request(testServer.app)
        .post('/v1/api/registerUser')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .expect( 200 );
    });
    test('Login successful user and password /v1/api/login', async () => {
        const {body} = await request(testServer.app)
        .post('/v1/api/login')
        .send(
            {
            email: newUser.email,
            password: newUser.password})
        .expect(200)
        expect( body ).toEqual( {
            token: expect.any( String ),
            msg:  expect.any( String ),
          });
    });
    test('Error email in create user v1/api/registerUser', async() => {
        const { body } = await request(testServer.app)
        .post('/v1/api/registerUser')
        .send({
            email: 'emailNotValid.com',
            password: '12345678'
        }).expect( 400);
        expect( body ).toEqual({
            statusCode: 400,
            error: expect.any( String ),
            message: expect.any( String ),
          });
    });
    test('Error credentials login password /v1/api/login', async () => {
        await request(testServer.app)
         .post('/v1/api/login')
         .send(
             {
             email: newUser.email,
             password: '123456789'})
         .expect(401);
     });
    test('Router no existing', async () => {
        await request(testServer.app)
        .post('/v1/api/notExisting')
        .expect(404);
    });
});