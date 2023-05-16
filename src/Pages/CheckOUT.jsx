import React, { useContext } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const CheckOUT = () => {
    const service = useLoaderData()
    const { title, _id, price, img } = service;
    const {user} = useContext(AuthContext);

    const handleBookService = e => {
        
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            BookingDate: date,
            email,
            img,
            service_title: title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        //send data to database

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'

            },
            body:JSON.stringify(booking)

        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                alert('successfully booked');
            }
        })
        

    }
    return (
        <div>
            <h2 className='text-center text-3xl'>book services : {title}</h2>
            <div className="card-body">
                <form onSubmit={handleBookService}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" name='name' defaultValue={user?.displayName}/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" placeholder="Date" className="input input-bordered" name='date' />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" name='email' defaultValue={user?.email} readOnly/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
                    <input type='text' className="input input-bordered" defaultValue={'$'+price} readOnly/>
                </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm"/>
                </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOUT;