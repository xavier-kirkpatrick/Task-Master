import { User } from '../../models/user.ts'
import db from './connection.ts'

export async function getUser(id: User['id']): Promise<User[]> {
  return db('users')
    .select('username', 'name', 'email', 'is_admin')
    .where('id', id)
}

export async function getAdminClients(authId: string) {
  return await db('tasks').select().where('admin_id', authId)
}
