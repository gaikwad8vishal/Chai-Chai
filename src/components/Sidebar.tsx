import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 z-50 shadow-md rounded-lg mt-24 fixed bg-white/10 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">🍵 Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `Button3 hover:scale-105 flex items-center gap-2 p-2 rounded ${
              isActive ? 'bg-blue-500' : 'bg-gray-500'
            }`
          }
        >
          Dashboard
        </NavLink>

        <div className="relative group">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `Button3 hover:scale-105 flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-blue-500' : 'bg-gray-500'
              }`
            }
          >
            Manage Users
          </NavLink>
          <div className="absolute z-90 left-full top-0 ml-0 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-in-out z-20 overflow-y-auto max-h-64">
            <NavLink
              to="/admin/users"
              className="block px-4 py-2 hover:bg-amber-100 rounded-t-lg"
            >
              View All Users
            </NavLink>
            <NavLink
              to="/admin/users/block-unblock"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Block/Unblock User
            </NavLink>
            <NavLink
              to="/admin/users/delete"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Delete User
            </NavLink>
            <NavLink
              to="/admin/users/update-role"
              className="block px-4 py-2 hover:bg-amber-100 rounded-b-lg"
            >
              Update User Role
            </NavLink>
          </div>
        </div>

        <div className="relative group">
          <NavLink
            to="/admin/all-products"
            className={({ isActive }) =>
              `Button3 hover:scale-105 flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-blue-500' : 'bg-gray-500'
              }`
            }
          >
            Manage Products
          </NavLink>
          <div className="absolute z-90 left-full top-0 ml-0 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-in-out z-20 overflow-y-auto max-h-64">
            <NavLink
              to="/admin/products/add"
              className="block px-4 py-2 hover:bg-amber-100 rounded-t-lg"
            >
              Add New Product
            </NavLink>
            <NavLink
              to="/admin/update-product"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Update Product
            </NavLink>
            <NavLink
              to="/admin/all-products"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              View All Products
            </NavLink>
            <NavLink
              to="/admin/delete-product"
              className="block px-4 py-2 hover:bg-amber-100 rounded-b-lg"
            >
              Delete Product
            </NavLink>
          </div>
        </div>

        <div className="relative group">
          <NavLink
            to="/admin/all-orders"
            className={({ isActive }) =>
              `Button3 hover:scale-105 flex items-center gap-2 p-2 rounded ${
                isActive ? 'bg-blue-500' : 'bg-gray-500'
              }`
            }
          >
            Manage Orders
          </NavLink>
          <div className="absolute z-90 left-full top-0 ml-0 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-in-out z-20 overflow-y-auto max-h-64">
            <NavLink
              to="/admin/all-orders"
              className="block px-4 py-2 hover:bg-amber-100 rounded-t-lg"
            >
              View All Orders
            </NavLink>
            <NavLink
              to="/admin/all-orders"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Update Order Status
            </NavLink>
            <NavLink
              to="/admin/cancel-order"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Cancel Order
            </NavLink>
            <NavLink
              to="/admin/order-stats"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Order Statistics
            </NavLink>
            <NavLink
              to="/admin/customer-orders"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Customer Order History
            </NavLink>
            <NavLink
              to="/admin/orders-by-period"
              className="block px-4 py-2 hover:bg-amber-100"
            >
              Orders by Period
            </NavLink>
            <NavLink
              to="/admin/assign-delivery"
              className="block px-4 py-2 hover:bg-amber-100 rounded-b-lg"
            >
              Assign Delivery Person
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;