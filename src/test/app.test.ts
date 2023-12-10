import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'

import app from '../app'
import { database } from '../utils/database'

beforeAll(async () => {
    console.log('Seeding Database')
    
        await database.user.deleteMany({
            where: {
                name: 'dev-test'
            }
        })
        await database.user.createMany({
            data: [
                {
                    id: 'query',
                    name: 'dev-test',
                    email: 'dev-query@gabrielro.me'
                },
                {
                    id: 'delete',
                    name: 'dev-test',
                    email: 'dev-delete@gabrielro.me'
                },
            ]
        })
        console.log('Seeding Database Complete')

}, 20000)

afterAll(async () => {
    console.log('Clear Database')
    try {
        await database.user.deleteMany({
            where: {
                name: 'dev-test'
            }
        })
        console.log('Clear Database Complete')
    }
    catch {
        throw new Error('Error on clear Database')
    }
}, 20000)

describe('GET /', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
    })
})

describe('GET /users', () => {
    it('get users from database', async () => {
        const response = await request(app).get('/users')
        // expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toHaveProperty('id')
    })
})

describe('POST /users', () => {
    it('create user on database', async () => {
        const response = await request(app).post('/users').send({
            id: 'create',
            name: 'dev-test',
            email: 'dev-create@gabrielro.me'
        })
        expect(response.text).toContain('created')
    })
})

describe('DELETE /users', () => {
    it('delete user on database', async () => {
        const response = await request(app).delete('/users').send({
            id: 'delete'
        })
        expect(response.text).toContain('ok')
    })
})