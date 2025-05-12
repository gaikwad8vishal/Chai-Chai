import { useEffect, useState } from "react";

const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export type OrderType = {
  id: string;
  orderId: string;
  name: string;
  quantity: number;
  price: number;
  status?: string; // Optional, as it might not always come from the API
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  // 🚀 Orders Fetch Karna Backend Se
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${backendurl}/admin/all-orders`);
        const data = await res.json();
        // Ensure data is an array and matches OrderType
        setOrders(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // 📌 Order Status Update Karne Ka Function
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`${backendurl}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // 📌 Order Cancel Karne Ka Function
  const cancelOrder = async (orderId: string) => {
    try {
      const response = await fetch(`${backendurl}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to cancel order");

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div className="px-24 py-4 bg-slate-400 h-screen">
      <div className="z-10 rounded-xl w-full bg-white/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold m-4">Admin - Manage Orders</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-500">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="border p-2">{order.orderId}</td>
                <td className="border p-2">{order.name}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">₹{order.price}</td>
                <td className="border p-2">{order.status || "PENDING"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => updateOrderStatus(order.id, "OUT_FOR_DELIVERY")}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                  >
                    Out for Delivery
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                  >
                    Mark Delivered
                  </button>
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;