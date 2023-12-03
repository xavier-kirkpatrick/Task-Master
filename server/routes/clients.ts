import express from 'express'

import { getUser } from '../db/users.ts'
import { getTasks } from '../db/getTasks.ts'
import { validateAccessToken } from '../auth0'

const router = express.Router()

// GET /api/v1/client
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const result = await getUser(auth0Id)
    if (result.length === 0) {
      return res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something went wrong')
  }
})

// Get all tasks that have been assigned to a specific client on their account.

router.get('/tasks', validateAccessToken, async (req, res) => {
  const auth0id = req.params.auth0id

  if (!auth0id) {
    res.status(400).json({ message: 'Please provide a valid id' })
    return
  }

  try {
    const result = await getTasks(auth0id)
    if (!auth0id) {
      res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something went wrong')
  }
})

export default router
