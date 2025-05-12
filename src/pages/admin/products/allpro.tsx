import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import { useState } from "react";
import { UpdateProduct } from "./edit";

const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}


export const AdminAllProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => { 
    AdminfetchProducts();
  }, []);
  
    
    const AdminfetchProducts = async () => {
      try {
        const response = await axios.get(`"${backendurl}/admin/all-products"`, {
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
      }
    };

   // Function to delete a product
    const AdmindeleteProduct = async (productId: string) => {

      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      try {
        await axios.delete(`${backendurl}/admin/delete-product/${productId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Remove deleted product from state without reloading
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };


  const AdminupdateProduct = (productId: string) => {
    const productToEdit = products.find((product) => product.id === productId);
      if (productToEdit) {
        setEditingProduct(productToEdit);
      }
    };

  return (
    <div className="p-6 adminbody h-screen ">
      <div className="mt-8 ml-4">
      </div>
      <div className="flex mt-16 ml-4 gap-12 ">
        <Sidebar/>
        <div>
        <h1 className="text-3xl font-bold mb-4">All Products...</h1>

        <div className="  ">
        {editingProduct ? ( 
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
              <div className=" p-6 rounded-lg shadow-lg z-50">
                <UpdateProduct
                  product={editingProduct}
                  onUpdate={() => {
                    AdminfetchProducts();
                    setEditingProduct(null);
                  }}
                  onCancel={() => setEditingProduct(null)}
                />
              </div>
            </div>
            ) : (
              <div className="w-full ">
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border p-4 w-92 rounded-lg shadow-md">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="text-green-600 font-bold">₹{product.price}</p>
                    <p>Stock: {product.stock}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => AdmindeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => AdminupdateProduct(product.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Update
                    </button>
                  </div>
                  </div>
                ))}
        </div></div>
      )}</div></div></div>
    </div>
  );
};






