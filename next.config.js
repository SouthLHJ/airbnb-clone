const mongoose = require('mongoose');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['maps.googleapis.com'],
  },
  rewrites : async() => {
    return [
      {
        destination: 'https://maps.googleapis.com/:path*',
        source: `/redis/:path*`,
      },
    ];
  }
}
module.exports = ()=>{
  
  const MONGODB_URI = process.env.MONGODB_URI;

  mongoose.connect(MONGODB_URI,{dbName : "typeScript-airbnb"})
    .then(()=>console.log("mongoose Init"))
  return nextConfig
}

