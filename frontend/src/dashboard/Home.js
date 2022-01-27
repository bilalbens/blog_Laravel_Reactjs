import React from 'react'
import AdminDashboard from './AdminDashboard'
import DashElements from './DashElements'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
    return (
        <div className="row" style={{ width:'100%'}}>
                    <div className="col-3"  style={{width:'20%'}}>
                         <AdminDashboard/>
                    </div>
                    <div className="col-9 p-3" >
                        <DashElements/>
                    </div>
        </div>
        
    )
}

export default Home
