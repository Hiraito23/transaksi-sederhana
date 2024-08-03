import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Input, message, Modal, Popconfirm, Table, Select } from "antd";
import axiosInstance from "../config/axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import dayjs from "dayjs";

const { Option } = Select;

const DeleteTransaksi = ({ record, fetchTransaksi }) => {
  const { mutate: deleteTransaksi } = useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/transaksi/${id}`);
    },
    onSuccess: () => {
      fetchTransaksi();
    },
  });

  const confirmDeleteYes = (id) => {
    deleteTransaksi(id);
    message.success("Delete data transaksi success");
  };
  const confirmDeleteNo = () => {
    message.error("Delete data transaksi failed");
  };

  return (
    <Popconfirm
      onConfirm={() => confirmDeleteYes(record.id_transaksi)}
      onCancel={confirmDeleteNo}
      title="Delete?"
      description="Are you sure delete this product?"
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

const AddTransaksi = ({ fetchTransaksi }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [customer, setDataCustomer] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/");
      setProducts(response.data.data);
    } catch (err) {
      console.log("Error fetching products:", err.message);
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await axiosInstance.get("/customer");
      setDataCustomer(response.data.data);
    } catch (err) {
      console.log("Error fetching customers", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomer();
  }, []);

  const formik = useFormik({
    initialValues: {
      nama_product: "",
      nama_customer: "",
      deskripsi: "",
      harga: "",
      harga_beli: "",
      diskon_rupiah: "",
      total_pembelian: "",
      create_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
    onSubmit: async () => {
      addTransaksi();
      formik.resetForm();
    },
  });

  const { mutate: addTransaksi } = useMutation({
    mutationFn: async () => {
      const {
        nama_product,
        nama_customer,
        deskripsi,
        harga_beli,
        diskon_rupiah,
        total_pembelian,
        create_at,
      } = formik.values;

      return await axiosInstance.post("/transaksi", {
        nama_product,
        nama_customer,
        deskripsi,
        harga_beli,
        diskon_rupiah,
        total_pembelian,
        create_at,
      });
    },
    onSuccess: () => {
      fetchTransaksi();
      setIsModalOpen(false);
    },
  });

  const handleProductChange = (value) => {
    const selectedProduct = products.find(
      (product) => product.nama_product === value
    );
    if (selectedProduct) {
      formik.setFieldValue("nama_product", selectedProduct.nama_product);
      formik.setFieldValue("deskripsi", selectedProduct.deskripsi);
      // formik.setFieldValue('harga', selectedProduct.harga);
      formik.setFieldValue("stock", selectedProduct.stock);
      formik.setFieldValue("harga_beli", selectedProduct.harga);
    }
  };

  const handleCustomerChange = (value) => {
    const selectedCustomer = customer.find(
      (customer) => customer.nama_customer === value
    );
    if (selectedCustomer) {
      formik.setFieldValue("nama_customer", selectedCustomer.nama_customer);
    }
  };

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    const hargaBeli = formik.values.harga_beli;
    const diskonRupiah = formik.values.diskon_rupiah;
    const totalPembelian = hargaBeli - diskonRupiah;
    formik.setFieldValue("total_pembelian", totalPembelian);
  }, [formik.values.harga_beli, formik.values.diskon_rupiah]);

  return (
    <div>
      <button
        onClick={showModal}
        className="border-2 border-blue-700 text-blue-500 py-1 px-2 rounded"
      >
        Add transaksi
      </button>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <p>Nama product</p>
            <Select
              name="nama_product"
              onChange={handleProductChange}
              value={formik.values.nama_product}
              className="w-full"
            >
              {products.map((product) => (
                <Option key={product.id_product} value={product.nama_product}>
                  {product.nama_product}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Nama Customer</p>
            <Select
              name="nama_customer"
              onChange={handleCustomerChange}
              value={formik.values.nama_customer}
              className="w-full"
            >
              {customer.map((customer) => (
                <Option
                  key={customer.id_customer}
                  value={customer.nama_customer}
                >
                  {customer.nama_customer}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <p>Deskripsi</p>
            <Input
              type="text"
              name="deskripsi"
              value={formik.values.deskripsi}
              readOnly
            />
          </div>
          <div>
            <p>Harga beli</p>
            <Input
              type="number"
              name="harga_beli"
              value={formik.values.harga_beli}
              onChange={handleFormInput}
            />
          </div>
          <div>
            <p>Diskon rupiah</p>
            <Input
              type="number"
              name="diskon_rupiah"
              value={formik.values.diskon_rupiah}
              onChange={handleFormInput}
            />
          </div>
          <div>
            <p>Total pembelian</p>
            <Input
              type="number"
              name="total_pembelian"
              value={formik.values.total_pembelian}
              readOnly
            />
          </div>
          <div>
            <p>Dibuat pada tanggal</p>
            <Input
              type="text"
              name="create_at"
              value={dayjs(formik.values.create_at).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              readOnly
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

const Transaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const fetchTransaksi = async () => {
    try {
      const response = await axiosInstance.get("/transaksi");
      setDataTransaksi(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching data transaksi");
    }
  };

  useEffect(() => {
    document.title = "Transaksi";
    fetchTransaksi();
  }, []);

  const columns = [
    {
      key: "1",
      title: "Nama Product",
      dataIndex: "nama_product",
    },
    {
      key: "2",
      title: "Nama Customer",
      dataIndex: "nama_customer",
    },
    {
      key: "3",
      title: "Harga Beli",
      dataIndex: "harga_beli",
    },
    {
      key: "4",
      title: "Diskon Rupiah",
      dataIndex: "diskon_rupiah",
    },
    {
      key: "5",
      title: "Total Pembelian",
      dataIndex: "total_pembelian",
    },
    {
      key: "6",
      title: "Di-buat pada tanggal",
      dataIndex: "create_at",
      render: (value) => {
        return dayjs(value).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      key: "7",
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <DeleteTransaksi
              record={record}
              fetchTransaksi={() => fetchTransaksi()}
            />
          </div>
        );
      },
    },
  ];

  const handleNewTab = () => {
    window.open("http://localhost:5173/laporan", "_blank");
  };

  return (
    <div className="grid gap-3">
      <Navbar />
      <div className="container mx-auto grid gap-2">
        <AddTransaksi fetchTransaksi={() => fetchTransaksi()} />
        <div className="p-2 grid gap-2 bg-slate-200 rounded">
          <p>Transaksi</p>
          <Table
            rowKey="id_transaksi"
            dataSource={dataTransaksi}
            columns={columns}
          />
          <button
            onClick={() => handleNewTab()}
            className="bg-blue-500 text-white rounded w-fit mx-auto py-2 px-3 hover:bg-blue-600 transition"
          >
            Laporan transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
