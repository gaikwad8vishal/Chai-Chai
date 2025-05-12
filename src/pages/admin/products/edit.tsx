import { useState } from "react";
import axios from "axios";

// 🏷️ Define Props Type
// 🏷️ Define Product Type
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  }
  



interface UpdateProductProps {
    product: Product;
    onUpdate: () => void;
    onCancel: () => void;
  }
  
 export const UpdateProduct: React.FC<UpdateProductProps> = ({ product, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<Product>({
      ...product,
    });
  
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
  
      try {
        await axios.put(
          `http://localhost:3000/admin/update-product/${product.id}`,
          formData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
  
        setMessage("Product updated successfully!");
        setLoading(false);
        onUpdate(); // Refresh product list
      } catch (error) {
        console.error("Error updating product:", error);
        setMessage("Failed to update product!");
        setLoading(false);
      }
    };
  
    return (
  
      <div className="w-96 mx-auto mt-10 p-6  shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Update Product</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
  
          <div className="flex gap-2">
            
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 text-whte px-4 py-2 rounded-md hover:bg-gray-700 transition w-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
  
    );
  };
  