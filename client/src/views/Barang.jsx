import { Input, message, Modal, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../config/axios'
import Navbar from '../components/Navbar'
import TextArea from 'antd/es/input/TextArea'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { AiOutlineDelete } from 'react-icons/ai'

const UpdateBarang = ({ record, fetchBarang }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
        handleFormEdit(record)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            nama_product: '',
            deskripsi: '',
            harga: '',
            // stock: '',
        }, onSubmit: async () => {
            const { nama_product, deskripsi, harga, stock } = formik.values

            updateBarang({
                id_product: record.id_product,
                nama_product,
                deskripsi,
                harga,
                // stock
            })
            formik.resetForm()
            setIsModalOpen(false)
        }
    })

    const { mutate: updateBarang } = useMutation({
        mutationFn: async (body) => {
            const response = await axiosInstance.patch(`/${body.id_product}`, body)
            return response.data
        },
        onSuccess: () => {
            fetchBarang()
        }
    })

    const handleFormEdit = (record) => {
        formik.setValues({
            id_product: record.id_product,
            nama_product: record.nama_product,
            deskripsi: record.deskripsi,
            harga: record.harga,
            // stock: record.stock
        });
    };

    return (
        <div>
            <button
                onClick={showModal}
                className='border-2 border-green-500 text-green-500 py-1 px-2 rounded'
            >
                Edit
            </button>

            <Modal
                open={isModalOpen}
                footer={[]}
                onCancel={handleCancel}
            >
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <p>Nama barang</p>
                        <Input
                            onChange={formik.handleChange}
                            name='nama_product'
                            type='text'
                            value={formik.values.nama_product}
                        />
                    </div>
                    <div>
                        <p>Deskripsi: </p>
                        <TextArea
                            onChange={formik.handleChange}
                            name='deskripsi'
                            type='text'
                            value={formik.values.deskripsi}
                        />
                    </div>
                    <div>
                        <p>Harga: </p>
                        <Input
                            onChange={formik.handleChange}
                            name='harga'
                            type='number'
                            value={formik.values.harga}
                        />
                    </div>
                    {/* <div>
                        <p>Stock: </p>
                        <Input
                            onChange={formik.handleChange}
                            name='stock'
                            type='number'
                            value={formik.values.stock}
                        />
                    </div> */}
                    <button type='submit' className='py-1 px-2 bg-blue-700 rounded hover:bg-blue-500 transition text-white w-fit'>Submit</button>
                </form>
            </Modal>
        </div>
    )
}

const DeleteBarang = ({ record, fetchBarang }) => {
    const { mutate: deleteProduct } = useMutation({
        mutationFn: async (id) => {
            return await axiosInstance.delete(`/${id}`)
        },
        onSuccess: () => {
            fetchBarang()
        }
    })

    const confirmDeleteYes = (id) => {
        deleteProduct(id)
        message.success('Delete data barang success')
    }
    const confirmDeleteNo = () => {
        message.error('Delete data barang failed')
    }
    return (
        <Popconfirm
            onConfirm={() => confirmDeleteYes(record.id_product)}
            onCancel={confirmDeleteNo}
            title='Delete?'
            description='Are you sure delete this product?'
            okText='Submit'
            cancelText='Cancel'
            className='cursor-pointer text-xl text-red-500 border-2 border-red-500 w-fit p-1 rounded hover:bg-red-100 transition'
        >
            <div>
                <AiOutlineDelete />
            </div>
        </Popconfirm>
    )
}

const AddBarang = ({ fetchBarang }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            nama_product: '',
            deskripsi: '',
            harga: '',
            // stock: '',
        },
        onSubmit: async () => {
            addBarang()
            formik.resetForm()
            setIsModalOpen(false)
        }
    })

    const { mutate: addBarang } = useMutation({
        mutationFn: async () => {
            const { nama_product, deskripsi, harga, stock } = formik.values

            return await axiosInstance.post('/', {
                nama_product,
                deskripsi,
                harga,
                // stock
            })
        },
        onSuccess: () => {
            console.log('Submitted');
            fetchBarang()
        }
    })

    const handleFormInput = (values) => {
        const { name, value } = values.target
        formik.setFieldValue(name, value)
        // console.log(name, value);
    }

    return (
        <div>
            <button
                onClick={showModal}
                className='border-2 border-blue-700 text-blue-500 py-1 px-2 rounded'
            >
                Add barang
            </button>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[]}
            >
                <form
                    onSubmit={formik.handleSubmit}
                    className='grid gap-3'
                >
                    <div>
                        <p>Nama barang</p>
                        <Input
                            value={formik.values.nama_product}
                            onChange={handleFormInput}
                            type='text'
                            name='nama_product'
                        />
                    </div>
                    <div>
                        <p>Deskripsi</p>
                        <TextArea
                            value={formik.values.deskripsi}
                            onChange={handleFormInput}
                            type='text'
                            name='deskripsi'
                        />
                    </div>
                    <div>
                        <p>Harga</p>
                        <Input
                            value={formik.values.harga}
                            onChange={handleFormInput}
                            type='number'
                            name='harga'
                        />
                    </div>
                    {/* <div>
                        <p>Stock</p>
                        <Input
                            value={formik.values.stock}
                            onChange={handleFormInput}
                            type='number'
                            name='stock'
                        />
                    </div> */}
                    <button
                        className="bg-blue-600 py-1 px-2 mt-3 text-white rounded hover:bg-blue-500 transition"
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    )
}

const Barang = () => {
    const [dataBarang, setDataBarang] = useState([])

    const fetchBarang = async () => {
        try {
            const response = await axiosInstance.get('/')
            setDataBarang(response.data.data)
            console.log(response.data);
        } catch (err) {
            console.log('Error fetching barang');
        }
    }

    const columns = [
        {
            key: '1',
            title: 'Nama barang',
            dataIndex: 'nama_product'
        },
        {
            key: '2',
            title: 'Deskripsi',
            dataIndex: 'deskripsi'
        },
        {
            key: '3',
            title: 'Harga',
            dataIndex: 'harga'
        },
        // {
        //     key: '4',
        //     title: 'Stock',
        //     dataIndex: 'stock'
        // },
        {
            key: '4',
            title: 'Actions',
            render: (text, record) => {
                return (
                    <div className='flex gap-2'>
                        <UpdateBarang record={record} fetchBarang={() => fetchBarang()} />
                        <DeleteBarang record={record} fetchBarang={() => fetchBarang()} />
                    </div>
                )
            }
        },
    ]

    useEffect(() => {
        document.title = 'Barang'
        fetchBarang()
    }, [])

    return (
        <div className='grid gap-3'>
            <Navbar />
            <div className='container mx-auto grid gap-2'>
                <AddBarang fetchBarang={() => fetchBarang()} />
                <div className='p-2 grid gap-2 bg-slate-200 rounded'>
                    <p>Master barang</p>
                    <Table
                        rowKey='id_product'
                        dataSource={dataBarang}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default Barang