import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-gray-500 p-2 text-white'>
            <div className='container mx-auto flex gap-5'>
                <Link to='/'>Barang</Link>
                <Link to='/transaksi'>Transaksi</Link>
                <Link to='/customers'>Customers</Link>
            </div>
        </div>
    )
}

export default Navbar