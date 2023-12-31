import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import { getUser, upsertUser } from '../db/users'

import { getMockToken } from './mockToken'
import { UserDraft } from '../../types/User'

vi.mock('../db/users')

describe('GET /api/v1/client/', () => {
  it('should return 200 with a user in an array', async () => {
    const testClient = [
      {
        id: 'auth0|001',
        username: 'testBanana',
        name: 'Banana Testana',
        email: 'test_banana@example.org',
        isAdmin: false,
      },
    ]

    vi.mocked(getUser).mockResolvedValue(testClient)
    const response = await request(server)
      .get('/api/v1/client/')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testClient)
  })

  it('should return 404 if the users not found', async () => {
    vi.mocked(getUser).mockResolvedValue(undefined)
    const response = await request(server)
      .get('/api/v1/client/')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(404)
    expect(response.text).toEqual('Not found')
  })

  it('should return 500 if the promise is rejected', async () => {
    vi.mocked(getUser).mockRejectedValue('')
    const response = await request(server)
      .get('/api/v1/client/')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.text).toEqual('Something went wrong')
  })
})

describe('POST /api/v1/client/add', () => {
  it('adding a new client should return 201', async () => {
    const newClient: UserDraft = {
      username: 'harry',
      name: 'Harry Otter',
      email: 'harry@example.com',
    }
    vi.mocked(upsertUser).mockResolvedValue([1])
    const response = await request(server)
      .post('/api/v1/client/edit')
      .send(newClient)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(201)
    expect(response.body).toStrictEqual([1])
  })

  it('returns 401 if not authenticated', async () => {
    const newClient: UserDraft = {
      username: 'harry',
      name: 'Harry Otter',
      email: 'harry@example.com',
    }
    const response = await request(server)
      .post('/api/v1/client/edit')
      .send(newClient)
    expect(response.status).toBe(401)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/client/edit (401)')
    )
  })

  it('returns 400 if invalid user data sent', async () => {
    const response = await request(server)
      .post('/api/v1/client/edit')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(400)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/client/edit (400)')
    )
  })

  it('returns 500 if addUser fails', async () => {
    const newClient: UserDraft = {
      username: 'harry',
      name: 'Harry Otter',
      email: 'harry@example.com',
    }
    vi.mocked(upsertUser).mockRejectedValue('')
    const response = await request(server)
      .post('/api/v1/client/edit')
      .send(newClient)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/client/edit (500)')
    )
  })
})
