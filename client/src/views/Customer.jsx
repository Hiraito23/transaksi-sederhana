import { Input, message, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import Navbar from "../components/Navbar";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { AiOutlineDelete } from "react-icons/ai";

const UpdateCustomer = ({ record, fetchCustomer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    handleFormEdit(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nama_customer: "",
      alamat: "",
      no_telpon: "",
    },
    onSubmit: async () => {
      const { nama_customer, alamat, no_telpon } = formik.values;
      updateCustomer({
        id_customer: record.id_customer,
        nama_customer,
        alamat,
        no_telpon,
      });
      formik.resetForm();
      setIsModalOpen(false);
    },
  });

  const { mutate: updateCustomer } = useMutation({
    mutationFn: async (body) => {
      const response = await axiosInstance.patch(
        `/customer/${body.id_customer}`,
        body
      );
      return response.data;
    },
    onSuccess: () => {
      fetchCustomer();
    },
  });

  const handleFormEdit = (record) => {
    formik.setValues({
      id_customer: record.id_customer,
      nama_customer: record.nama_customer,
      alamat: record.alamat,
      no_telpon: record.no_telpon,
    });
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="border-2 border-green-500 text-green-500 py-1 px-2 rounded"
      >
        Edit
      </button>

      <Modal open={isModalOpen} footer={[]} onCancel={handleCancel}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <p>Nama customer:</p>
            <Input
              onChange={formik.handleChange}
              name="nama_customer"
              type="text"
              value={formik.values.nama_customer}
            />
          </div>
          <div>
            <p>Alamat: </p>
            <TextArea
              onChange={formik.handleChange}
              name="alamat"
              type="text"
              value={formik.values.alamat}
            />
          </div>
          <div>
            <p>No telpon: </p>
            <Input
              onChange={formik.handleChange}
              name="no_telpon"
              type="text"
              value={formik.values.no_telpon}
            />
          </div>
          <button
            type="submit"
            className="py-1 px-2 bg-blue-700 rounded hover:bg-blue-500 transition text-white w-fit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

const DeleteCustomer = ({ record, fetchCustomer }) => {
  const { mutate: deleteCustomer } = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/customer/${id}`);
    },
    onSuccess: () => {
      fetchCustomer();
    },
  });

  const confirmDeleteYes = (id) => {
    deleteCustomer(id);
    message.success("Delete data customer success");
  };
  const confirmDeleteNo = () => {
    message.error("Delete data customer failed");
  };
  return (
    <Popconfirm
      onConfirm={() => confirmDeleteYes(record.id_customer)}
      onCancel={confirmDeleteNo}
      title="Delete?"
      description="Are you sure delete this customer?"
      okText="Submit"
      cancelText="Cancel"
      className="cursor-pointer text-xl text-red-500 border-2 border-red-500 w-fit p-1 rounded hover:bg-red-100 transition"
    >
      <div>
        <AiOutlineDelete />
      </div>
    </Popconfirm>
  );
};

const AddCustomer = ({ fetchCustomer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nama_customer: "",
      alamat: "",
      no_telpon: "",
    },
    onSubmit: async () => {
      addCustomer();
      formik.resetForm();
      setIsModalOpen(false);
    },
  });

  const { mutate: addCustomer } = useMutation({
    mutationFn: async () => {
      const { nama_customer, alamat, no_telpon } = formik.values;
      return await axiosInstance.post("/customer", {
        nama_customer,
        alamat,
        no_telpon,
      });
    },
    onSuccess: () => {
      console.log("Submitted");
      fetchCustomer();
    },
  });

  const handleFormInput = (values) => {
    const { name, value } = values.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="border-2 border-blue-700 text-blue-500 py-1 px-2 rounded"
      >
        Add customer
      </button>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <form onSubmit={formik.handleSubmit} className="grid gap-3">
          <div>
            <p>Nama customer</p>
            <Input
              value={formik.values.nama_customer}
              onChange={handleFormInput}
              type="text"
              name="nama_customer"
            />
          </div>
          <div>
            <p>Alamat</p>
            <TextArea
              value={formik.values.alamat}
              onChange={handleFormInput}
              type="text"
              name="alamat"
            />
          </div>
          <div>
            <p>No telpon</p>
            <Input
              value={formik.values.no_telpon}
              onChange={handleFormInput}
              type="text"
              name="no_telpon"
            />
          </div>
          <button
            className="bg-blue-600 py-1 px-2 mt-3 text-white rounded hover:bg-blue-500 transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

const Customer = () => {
  const [dataCustomer, setDataCustomer] = useState([]);

  const fetchCustomer = async () => {
    try {
      const response = await axiosInstance.get("/customer");
      setDataCustomer(response.data.data);
      console.log("Fetch data customers succss", response.data);
    } catch (err) {
      console.log("Get data customers failed", err.message);
    }
  };

  const columns = [
    {
      key: "1",
      title: "Nama customer",
      dataIndex: "nama_customer",
    },
    {
      key: "2",
      title: "Alamat",
      dataIndex: "alamat",
    },
    {
      key: "3",
      title: "No telpon",
      dataIndex: "no_telpon",
    },
    {
      key: "4",
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <UpdateCustomer
              record={record}
              fetchCustomer={() => fetchCustomer()}
            />
            <DeleteCustomer
              record={record}
              fetchCustomer={() => fetchCustomer()}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Customer";
    fetchCustomer();
  }, []);

  return (
    <div className="grid gap-3">
      <Navbar />
      <div className="container mx-auto grid gap-2">
        <AddCustomer fetchCustomer={() => fetchCustomer()} />
        <div className="p-2 grid gap-2 bg-slate-200 rounded">
          <p>Data customer</p>
          <Table
            columns={columns}
            rowKey="id_customer"
            dataSource={dataCustomer}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
