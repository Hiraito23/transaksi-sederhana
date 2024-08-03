import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import axiosInstance from '../config/axios'

const Laporan = () => {
    const [dataReports, setDataReports] = useState([])

    const fetchSelectedItems = async () => {
        const response = await axiosInstance.get('/transaksi')
        const groupedData = response.data.data.reduce((acc, item) => {
            if (!acc[item.nama_product]) {
                acc[item.nama_product] = []
            }
            acc[item.nama_product].push(item)
            return acc
        }, {})
        setDataReports(groupedData)
    }

    useEffect(() => {
        document.title = 'Reports kartu stock'
        fetchSelectedItems()
        localStorage.getItem('queryData');
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-end mb-4'>
                <div className='text-right'>
                    <p className='text-xl font-bold'>Laporan transaksi masuk</p>
                    <div className='flex gap-3'>
                        <p>Tanggal:</p>
                        <p>{dayjs().format('DD-MM-YYYY HH:mm:ss')}</p>
                    </div>
                </div>
            </div>
            {Object.entries(dataReports).map(([nama_product, reports], index) => (
                <div key={index} className='mb-4 border border-gray-300 p-4 rounded-md shadow-sm'>
                    <div className='flex gap-5 py-2'>
                        <p className='font-semibold'>Item:</p>
                        <p>{nama_product}</p>
                    </div>
                    <table className='min-w-full border-collapse table-auto'>
                        <thead className='bg-gray-200 text-xs md:text-base'>
                            <tr>
                                <th className='p-2 border border-gray-300 text-left'>Nama product</th>
                                <th className='p-2 border border-gray-300 text-left'>Nama customer</th>
                                <th className='p-2 border border-gray-300 text-left'>Harga</th>
                                <th className='p-2 border border-gray-300 text-left'>Diskon rupiah</th>
                                <th className='p-2 border border-gray-300 text-left'>Total pembelian</th>
                                <th className='p-2 border border-gray-300 text-left'>Dibuat pada tanggal</th>
                            </tr>
                        </thead>
                        <tbody className='text-xs'>
                            {reports.map((report, reportIndex) => (
                                <tr key={reportIndex} className='bg-white md:text-base'>
                                    <td className='p-2 border border-gray-300'>{report.nama_product}</td>
                                    <td className='p-2 border border-gray-300'>{report.nama_customer}</td>
                                    <td className='p-2 border border-gray-300'>{report.harga_beli}</td>
                                    <td className='p-2 border border-gray-300'>{report.diskon_rupiah}</td>
                                    <td className='p-2 border border-gray-300'>{report.total_pembelian}</td>
                                    <td className='p-2 border border-gray-300'>{dayjs(report.create_at).format('DD/MM/YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default Laporan
