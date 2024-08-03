import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Barang from './views/Barang'
import Transaksi from './views/Transaksi'
import Laporan from './views/Laporan'
import Customer from './views/Customer'

const queryClient = new QueryClient

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Barang />} />
          <Route path='/transaksi' element={<Transaksi />} />
          <Route path='/customers' element={<Customer />} />
          <Route path='/laporan' element={<Laporan />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App