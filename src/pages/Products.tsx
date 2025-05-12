import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck } from "react-icons/fa"; // Import icons




const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const AllProductsU = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendurl}/admin/all-products`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });


      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Invalid data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Add to Cart Function
  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to cart.");
        return;
      }
      await axios.post(
        `${backendurl}/user/add-to-cart`,
        { productId: product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  // ✅ Place Order Function
  const placeOrder = async ( ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to place an order.");
        return;
      }


      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      {loading ? (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-64 bg-white/10 rounded-lg shadow-lg p-4 flex flex-col justify-between animate-pulse"
          >
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mt-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            <div className="flex justify-between mt-4">
              <button className=" bg-gray-300 rounded-[20px] px-14 py-6" ></button>
              <button className="bg-gray-300 rounded-[20px] px-14 py-6" ></button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 rounded-lg bg-white/10 shadow-md"
            >
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <p>Stock: {product.stock}</p>

              <div className="flex gap-4 mt-2">
                <button onClick={() => addToCart(product)} className="flex items-center button1">
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                <button onClick={() => placeOrder()} className="items-center flex button1">
                  <FaCheck className="mr-2" /> Place Order
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
