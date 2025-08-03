import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-transparent border-t-[#7AA859] border-r-red-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-b-red-400 border-l-orange-400 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  )
}