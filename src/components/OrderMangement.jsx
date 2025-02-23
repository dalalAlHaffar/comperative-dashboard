import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const formik = useFormik({
    initialValues: {
      id: "",
      product: "",
      quantity: "",
      customer: "",
    },
    validationSchema: Yup.object({
      product: Yup.string().required("Product name is required"),
      quantity: Yup.number().required("Quantity is required").positive().integer(),
      customer: Yup.string().required("Customer name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editingOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === editingOrder.id ? values : order))
        );
      } else {
        setOrders([...orders, { ...values, id: uuidv4() }]);
      }
      resetForm();
      setEditingOrder(null);
    },
  });

  const handleEdit = (order) => {
    setEditingOrder(order);
    formik.setValues(order);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Management</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={formik.values.product}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.product && <p className="text-red-500">{formik.errors.product}</p>}

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.quantity && <p className="text-red-500">{formik.errors.quantity}</p>}

        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={formik.values.customer}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.customer && <p className="text-red-500">{formik.errors.customer}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {editingOrder ? "Update Order" : "Create Order"}
        </button>
      </form>

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.product}</td>
              <td className="p-2">{order.quantity}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(order)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
