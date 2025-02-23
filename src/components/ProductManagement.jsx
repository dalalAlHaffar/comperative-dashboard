import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const ProductManagement = () => {
  return (
    <div className="flex min-w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-main-background min-h-screen">
        <NavBar link="/products" />
        <ProductTable />
      </div>
    </div>
  );
};

const ProductTable = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Products updated:", products);
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <main className="px-5 py-5">
      <div className="mt-8 flex flex-col min-w-full border-b border-gray-200 shadow rounded-lg overflow-auto">
        <div className="bg-white text-black-50 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Product Management</h2>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <table className="min-w-full">
          <thead className="bg-white">
            <tr className="text-left">
              <th className="table-header">Id</th>
              <th className="table-header">Name</th>
              <th className="table-header">Price</th>
              <th className="table-header">Category</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="text-left">
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-gray-500">${product.price}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      <PencilIcon className="w-6 h-6 text-actions-go" />
                    </button>
                    <button
                      className="px-2 py-1 rounded"
                      onClick={() => handleDelete(product.id)}
                    >
                      <TrashIcon className="w-6 h-6 text-actions-stop" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          setProducts={setProducts}
          products={products}
        />
      )}
    </main>
  );
};

const ProductModal = ({ isOpen, onClose, product, setProducts, products }) => {
  const formik = useFormik({
    initialValues: {
      id: product ? product.id : "",
      name: product ? product.name : "",
      price: product ? product.price : "",
      category: product ? product.category : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number().required("Price is required").positive(),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (product) {
        setProducts(products.map((p) => (p.id === product.id ? values : p)));
      } else {
        setProducts([...products, { ...values, id: uuidv4() }]);
      }
      resetForm();
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#bec0caad] text-black-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            {...formik.getFieldProps("name")}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            {...formik.getFieldProps("price")}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            {...formik.getFieldProps("category")}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary-100 text-white py-2 rounded"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
