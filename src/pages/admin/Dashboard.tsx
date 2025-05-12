import { useEffect, useState } from "react";
import { getOrderStats, getAllUsers, getAllOrders, getCustomerOrders } from "../../api/admin";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Users, Package, DollarSign } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import Navbar from "../../components/Navbar";


// Define Types
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  items: OrderItem[];
  productName?: string; // Computed in frontend
}

interface User {
  id: string;
  username: string;
  role: "USER" | "ADMIN" | "DELIVERY_PERSON";
}

interface Stats {
  totalOrders: number;
  totalUsers: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  popularProducts: { name: string; quantity: number }[];
  groupedData: { [key: string]: { orders: number; revenue: number } };
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    popularProducts: [],
    groupedData: {},
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"recent" | "customer">("recent");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [orderStats, fetchedUsers, allOrders] = await Promise.all([
          getOrderStats(),
          getAllUsers(),
          getAllOrders(),
        ]);

        // Filter users to only include USER role
        const filteredUsers = fetchedUsers.filter((user: User) => user.role === "USER");

        const mappedRecentOrders = allOrders.slice(0, 5).map((order: Order) => ({
          ...order,
          productName: order.items && order.items.length > 0 ? order.items[0].name : "Unknown Product",
        }));

        setStats({
          totalOrders: orderStats.totalOrders || 100,
          totalUsers: filteredUsers.length || 0,
          pendingOrders: orderStats.pendingOrders || orderStats.pending || 0,
          deliveredOrders: orderStats.deliveredOrders || orderStats.delivered || 0,
          cancelledOrders: orderStats.cancelledOrders || orderStats.cancelled || 0,
          totalRevenue: orderStats.totalRevenue || 0,
          popularProducts: orderStats.popularProducts || [],
          groupedData: orderStats.groupedData || {},
        });
        setUsers(filteredUsers);
        setOrders(mappedRecentOrders);
        setSelectedUserId(filteredUsers[0]?.id || null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      if (!selectedUserId || viewMode !== "customer") return;

      setLoading(true);
      try {
        const customerOrdersData = await getCustomerOrders(selectedUserId);
        const mappedCustomerOrders = customerOrdersData.orders.slice(0, 5).map((order: Order) => ({
          ...order,
          productName: order.items && order.items.length > 0 ? order.items[0].name : "Unknown Product",
        }));
        setOrders(mappedCustomerOrders);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, [selectedUserId, viewMode]);

  const orderChartData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Delivered", value: stats.deliveredOrders },
    { name: "Cancelled", value: stats.cancelledOrders },
  ];
  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  const timePeriodChartData = Object.entries(stats.groupedData).map(([key, value]) => ({
    name: key,
    orders: value.orders,
  }));

  return (
    <div className="adminbody min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <main className="flex-1 p-6 mx-4 mt-12 rounded-xl bg-white/20 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

          {/* Cards Section */}
          <div className="grid md:grid-cols-4 gap-6">
            {loading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/20 animate-pulse rounded-xl w-full h-20"
                  />
                ))}
              </>
            ) : (
              <>
                <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                  <Package className="text-green-500" size={40} aria-hidden="true" />
                  <CardContent className="ml-4">
                    <CardTitle>Total Orders</CardTitle>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                  <Users className="text-blue-500" size={40} aria-hidden="true" />
                  <CardContent className="ml-4">
                    <CardTitle>Total Users</CardTitle>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                  <Package className="text-orange-500" size={40} aria-hidden="true" />
                  <CardContent className="ml-4">
                    <CardTitle>Pending Orders</CardTitle>
                    <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                  <DollarSign className="text-yellow-500" size={40} aria-hidden="true" />
                  <CardContent className="ml-4">
                    <CardTitle>Total Revenue</CardTitle>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Order Status</h2>
              {loading ? (
                <div className="animate-pulse bg-white/20 h-[200px] rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={orderChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {orderChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Orders by Period</h2>
              {loading ? (
                <div className="animate-pulse bg-white/20 h-[200px] rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={timePeriodChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#82ca9d" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="mt-8">
            <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl  p-2 rounded font-semibold text-gray-700">
                  Recent Orders...
                </h2>
              </div>
              {loading ? (
                <div className="animate-pulse bg-white/20 h-[120px] rounded-lg" />
              ) : (
                <ul role="list">
                  {orders.length === 0 ? (
                    <li className="text-gray-500">
                      {viewMode === "recent"
                        ? "No recent orders available."
                        : selectedUserId
                        ? "No orders for this customer."
                        : "Please select a customer."}
                    </li>
                  ) : (
                    orders.map((order) => (
                      <li
                        key={order.id}
                        className="border-b py-2 flex justify-between text-gray-800"
                        role="listitem"
                      >
                        <span>Order: {order.productName}</span>
                        <span
                          className={`font-semibold ${
                            order.status === "PENDING"
                              ? "text-orange-500"
                              : order.status === "DELIVERED"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default Dashboard;



import { FaEnvelope, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";

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

