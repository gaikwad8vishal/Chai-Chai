import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";
import Navbar from "../../../components/Navbar";
import { AdminFooter } from "../Dashboard";

const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface User {
  id: string;
  username: string;
  role: "USER" | "ADMIN" | "DELIVERY_PERSON";
  isBlocked: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendurl}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Block/Unblock User
  const toggleBlockUser = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const action = user.isBlocked ? "unblock" : "block";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      await axios.patch(
        `${backendurl}/admin/user/block-unblock/${userId}`,
        {},
        { withCredentials: true }
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user block status:", error);
      alert("Failed to toggle block status. Please try again.");
    }
  };

  // Delete User
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${backendurl}/admin/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Update User Role
  const updateUserRole = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${backendurl}/admin/update-role/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole as User["role"] } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-24">
        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="p-4 md:p-6 rounded-xl bg-white/10">
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="USER">User</option>
                          <option value="ADMIN">Admin</option>
                          <option value="DELIVERY_PERSON">Delivery</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.isBlocked ? "Blocked" : "Not-Blocked"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 space-x-2">
                        <button
                          onClick={() => toggleBlockUser(user.id)}
                          className={`px-3 py-1 text-white rounded ${
                            user.isBlocked ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-3 py-1 bg-gray-700 text-white rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Name:</span>
                    <span>{user.username}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold">Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="DELIVERY_PERSON">Delivery</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold">Status:</span>
                    <span>{user.isBlocked ? "Blocked" : "Not-Blocked"}</span>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => toggleBlockUser(user.id)}
                      className={`px-3 py-1 text-white rounded ${
                        user.isBlocked ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default Users;