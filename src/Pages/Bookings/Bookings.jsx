import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const {user} = useContext(AuthContext);
    const [bookings, setBookings]= useState([]);
    const navigate= useNavigate();
    
    const url = `https://car-doctor-server-nine-ivory.vercel.app/bookings?email=${user?.email}`;
    useEffect(()=>{
        fetch(url,{
          method: 'Get',
          headers: {
            authorization: `Bearer ${localStorage.getItem('car-access-token')}`
          }
        })
        .then(res=>res.json())
        .then(data =>{
          if(!data.error){
            setBookings(data)
          }
          else{
            navigate('/');
          }
          
        })

    },[url, navigate])
    const handleDelete = id =>{
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
            fetch(`https://car-doctor-server-nine-ivory.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = bookings.filter(booking => booking._id !== id);
                setBookings(remaining);
            })
        }
    }

    const handleConfirm = id =>{
        fetch(`https://car-doctor-server-nine-ivory.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                //update state
                const remaining = bookings.filter(booking => booking._id !== id);
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm';
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }
    return (
        <div>
        <h2 className='text-5xl'>Booking {bookings.length}</h2>  
        <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Service</th>
        <th>Customer Name</th>
        <th>Price</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {bookings.map(booking => <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleConfirm={handleConfirm}></BookingRow>)}
      
    </tbody>
    {/* foot */}
    
    
  </table>
</div>  
        </div>
    );
};

export default Bookings;