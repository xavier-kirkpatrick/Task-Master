import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getAdminClientTasks } from '../apis/admin'
import { AdminClientTask } from '../../types/Admin'

function AdminClientTasks() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { clientUsername } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminClientTasks'],
    queryFn: async (): Promise<AdminClientTask[]> => {
      const adminId = await getAccessTokenSilently()
      const adminClientTasks = await getAdminClientTasks(
        adminId,
        clientUsername as string
      )
      return adminClientTasks
    },
  })
  if (!isAuthenticated && !user) {
    return <div>Not authenticated</div>
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError) {
    return <p>something went wrong</p>
  }

  return (
    <>
      <h2>Client: {clientUsername}</h2>
      <div>
        {data.map((task) => (
          <div key={task.id}>
            {task.date.toString()} -- {task.taskName} -- {task.isComplete} -
            <button>del</button>
          </div>
        ))}
      </div>
      <div>Add task</div>
      <form className="grid">
        <label>
          task option
          <input type="text" name="taskOptionId" />
        </label>

        <label>
          complete?
          <input type="checkbox" name="isComplete" />
        </label>

        <label>
          date
          <input type="date" name="date" />
        </label>
        <button>Add</button>
      </form>
    </>
  )
}

export default AdminClientTasks
