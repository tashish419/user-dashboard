import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../store/slices/userSlice"
import { logout } from "../store/slices/authSlice"
import type { AppDispatch, RootState } from "../store/store"

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.user)
  const { token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers())
    }
  }, [dispatch, token])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">Users</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div key={user.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.first_name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard


