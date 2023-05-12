import React from 'react';
import personImg from '../../../assetsss/images/about_us/person.jpg'
import partsImg from '../../../assetsss/images/about_us/parts.jpg'

const About = () => {
    return (
        <div className='mb-10'>
            
        <div className="hero min-h-screen ">
            
  <div className="hero-content flex-col lg:flex-row">
    <div className='lg:w-1/2 relative'>
        <img src={personImg} className="w-3/4 rounded-lg shadow-2xl" />
        <img src={partsImg} className="w-1/2 rounded-lg shadow-2xl absolute left-56 top-32 border-white border-4" />
        </div>
    <div className='lg:w-1/2'>
      <h1 className="text-5xl font-bold text-orange-400">About Us</h1>
      <h1 className="text-7xl font-bold">We are qualified & of experience in this field</h1>
      <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
      <button className="btn btn-warning">Get more info</button>
    </div>
  </div>
</div>
</div>
    );
};

export default About;