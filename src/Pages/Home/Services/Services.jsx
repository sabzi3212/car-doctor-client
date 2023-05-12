import React, { useEffect, useState } from 'react';
import Service from './Service';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch('Services.json')
        .then(res=>res.json())
        .then(data =>{
            setServices(data);
        })
    },[])
    return (
        <div className='mt-4 mb-4'>
        <div className='text-center'>
            <h3 className='text-3xl text-red-500 mb-2 font-bold'>Our Services</h3>
            <h2 className='text-5xl mb-4 font-bold'>Our Service Area</h2>
            <p>the majority have suffered alteration in some form, by injected humour,<br /> or randomised words which don't look even slightly believable. </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {services.map(service => <Service key={service._id} service ={service}></Service>)}
        </div>
        </div>
    );
};

export default Services;