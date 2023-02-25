import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminNotifications from '../components/Admin/AdminNotifications'
import AdminSidebar from '../components/Admin/AdminSidebar'
import Dashbord from '../components/Admin/Dashbord'
import IPsetup from '../components/Admin/IPsetup'
import Products from '../components/Admin/Products';


function Admin() {
    return (
        <div className='flex'>

            <AdminSidebar />

            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/dashbord" element={<Dashbord />} />
                <Route path="/products" element={<Products />} />
                <Route path="/ipsetup" element={<IPsetup />} />
                <Route path="/notification" element={<AdminNotifications />} />
            </Routes>
        </div>
    )
}

export default Admin