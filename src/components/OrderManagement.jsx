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

const OrderManagement = () => {
  return (
    <div className="flex min-w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-main-background min-h-screen">
        <NavBar link="/orders" />
        <OrderTable />
      </div>
    </div>
  );
};

const OrderTable = () => {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Orders updated:", orders);
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <main className="px-5 py-5">
      <div className="mt-8 flex flex-col min-w-full border-b border-gray-200 shadow rounded-lg overflow-auto">
        <div className="bg-white text-black-50 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Management</h2>
          <button
            onClick={() => {
              setSelectedOrder(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-200"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Order
          </button>
        </div>
        <table className="min-w-full">
          <thead className="bg-white">
            <tr className="text-left">
              <th className="table-header">Id</th>
              <th className="table-header">Product</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Customer</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id} className="text-left">
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{order.product}</td>
                  <td className="px-6 py-4 text-gray-500">{order.quantity}</td>
                  <td className="px-6 py-4 text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(order)}
                    >
                      <PencilIcon className="w-6 h-6 text-actions-go" />
                    </button>
                    <button
                      className="px-2 py-1 rounded"
                      onClick={() => handleDelete(order.id)}
                    >
                      <TrashIcon className="w-6 h-6 text-actions-stop" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-5 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          setOrders={setOrders}
          orders={orders}
        />
      )}
    </main>
  );
};

const OrderModal = ({ isOpen, onClose, order, setOrders, orders }) => {
  const formik = useFormik({
    initialValues: {
      id: order ? order.id : "",
      product: order ? order.product : "",
      quantity: order ? order.quantity : "",
      customer: order ? order.customer : "",
    },
    validationSchema: Yup.object({
      product: Yup.string().required("Product name is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .positive()
        .integer(),
      customer: Yup.string().required("Customer name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (order) {
        setOrders(orders.map((o) => (o.id === order.id ? values : o)));
      } else {
        console.log("Orders created:", [
          ...orders,
          { ...values, id: uuidv4() },
        ]);

        setOrders([...orders, { ...values, id: uuidv4() }]);
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
            {order ? "Edit Order" : "Create Order"}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formik.values.product}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.product && (
            <p className="text-red-500">{formik.errors.product}</p>
          )}

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.quantity && (
            <p className="text-red-500">{formik.errors.quantity}</p>
          )}

          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formik.values.customer}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded"
          />
          {formik.errors.customer && (
            <p className="text-red-500">{formik.errors.customer}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary-100 text-white py-2 rounded"
          >
            {order ? "Update Order" : "Create Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderManagement;
