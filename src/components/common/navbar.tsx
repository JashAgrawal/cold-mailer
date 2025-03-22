"use client"
import React from 'react'
import SignInButton from './signInButton'
import { Mail } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='bg-gray-50 w-full flex justify-between items-center p-4'>
      <div className='flex items-center gap-4'>
        <Link href="/">
        <Mail className="h-6 w-6"/>
        </Link>
        {/* <img src="/logo.png" alt="Logo" className='w-10' /> */}
        <h1 className='text-xl font-bold'>Cold Mailer</h1>
      </div>
      <SignInButton/>
    </div>
  )
}

export default Navbar
