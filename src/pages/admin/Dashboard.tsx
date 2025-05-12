import { useState, useEffect } from "react";
import { FaUsers, FaBoxOpen, FaChartLine, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";


interface Order {
  id: number;
  customerName: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
}

interface Analytics {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;  
}

// Mock API URL (replace with actual backend URL)
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const Dashboard = () => {
  // State declarations
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Removed unused 'users' state
  // const [users, setUsers] = useState<User[]>([]);

  // Removed unused 'setViewMode' by not destructuring it
  const [viewMode] = useState<"recent" | "customer">("recent");

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch orders
        const ordersResponse = await axios.get(`${backendURL}/orders`);
        setOrders(ordersResponse.data);

        // Fetch analytics
        const analyticsResponse = await axios.get(`${backendURL}/analytics`);
        setAnalytics(analyticsResponse.data);

        // Note: Removed fetching users since 'users' state is unused
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler to open order details modal
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Handler to update order status
  const handleUpdateStatus = async (orderId: number, newStatus: Order["status"]) => {
    try {
      await axios.patch(`${backendURL}/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      handleCloseModal();
    } catch (err) {
      setError("Failed to update order status.");
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 flex items-center gap-2">
          <FaExclamationTriangle className="text-2xl" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Overview of Chai-Chai operations
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Total Users
              </h3>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {analytics?.totalUsers || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <FaBoxOpen className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Total Orders
              </h3>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {analytics?.totalOrders || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Revenue
              </h3>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                ₹{analytics?.revenue || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <FaExclamationTriangle className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Pending Orders
              </h3>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {analytics?.pendingOrders || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {viewMode === "recent" ? "Recent Orders" : "Customer Orders"}
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-3 px-4 text-gray-800 dark:text-white">Order ID</th>
              <th className="py-3 px-4 text-gray-800 dark:text-white">Customer</th>
              <th className="py-3 px-4 text-gray-800 dark:text-white">Date</th>
              <th className="py-3 px-4 text-gray-800 dark:text-white">Status</th>
              <th className="py-3 px-4 text-gray-800 dark:text-white">Total</th>
              <th className="py-3 px-4 text-gray-800 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b dark:border-gray-700">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{order.id}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{order.customerName}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{order.date}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{order.status}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">₹{order.total}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Order Details
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Customer:</strong> {selectedOrder.customerName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Total:</strong> ₹{selectedOrder.total}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            {/* Update Status Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-800 dark:text-white mb-2">
                Update Status:
              </label>
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  handleUpdateStatus(selectedOrder.id, e.target.value as Order["status"])
                }
                className="w-full p-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;


import { FaEnvelope, FaCog } from "react-icons/fa";

export const AdminFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="  py-8 mt-10 border-t border-gray-700"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Admin Navigation */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Admin Panel</h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/admin/dashboard" className="hover:text-yellow-400 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/admin/all-orders" className="hover:text-yellow-400 transition">
                  Orders
                </a>
              </li>
              <li>
                <a href="/admin/users" className="hover:text-yellow-400 transition">
                  Users
                </a>
              </li>
              <li>
                
                <a href="/admin/settings" className="hover:text-yellow-400 transition">
                  Settings
                </a>
              </li>
            </ul>
          </div>


          {/* Support Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Support</h2>
            <p className="text-gray-300 flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              Email: admin-support@chai-chai.com
            </p>
            <p className="text-gray-300">Phone: +91 9373037975</p>
            <p className="text-gray-300">Address: Pune, India</p>
          </div>

          {/* System Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">System</h2>
            <p className="text-gray-300 flex items-center gap-2">
              <FaCog className="text-yellow-400" />
              Version: 1.0.0
            </p>
            <p className="text-gray-300">Last Updated: April 2025</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400 mt-8">
          © {new Date().getFullYear()} Chai-Chai Admin. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

