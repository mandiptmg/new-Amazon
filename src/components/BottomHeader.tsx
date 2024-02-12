'use client'
import { StateProps } from '@/types/index'
import { LuMenu } from 'react-icons/lu'

import { signIn, signOut } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '@/store/nextSlice'
import { useState } from 'react'
import { FaChevronRight, FaTimes, FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import { menuItems } from '@/data/Data'
import Link from 'next/link'

interface MenuItem {
  title: string
  items: string[]
}

const BottomHeader = () => {
  const [menuItem, setMenuItem] = useState(false)
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut()
    dispatch(removeUser())
  }
  return (
    <div>
      <div className='w-full h-10 text-sm text-white px-2 flex items-center'>
        <p
          onClick={() => setMenuItem(!menuItem)}
          className='hidden md:inline-flex  items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'
        >
          <LuMenu className='text-xl' /> All
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'>
          Todays Deals
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'>
          Customer Service
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'>
          Registry
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'>
          Gift Cards
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs sm:text-sm md:text-base'>
          Sell
        </p>
        {userInfo ? (
          <p
            onClick={handleSignOut}
            className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-yellow-500 text-xs sm:text-sm md:text-base'
          >
            SignOut
          </p>
        ) : null}
      </div>
      <div
        className={
          menuItem
            ? `w-screen fixed top-0 left-0 z-30 h-screen overflow-hidden bg-black/70`
            : 'hidden'
        }
      >
        <div className='w-[370px]  h-screen absolute top-0 left-0 z-40  bg-gray-100'>
          <button
            onClick={() => setMenuItem(false)}
            className='absolute top-5 -right-10 '
          >
            <FaTimes className='text-3xl font-light text-white  ' />
          </button>
          <div>
            <div className='bg-slate-900 cursor-pointer  py-4 px-5 text-white'>
              {userInfo ? (
                <div className='flex items-center cursor-pointer gap-5'>
                  <Image
                    src={userInfo.image}
                    width={40}
                    height={40}
                    alt={userInfo.name}
                    className='rounded-full object-cover '
                  />
                  <div className='text-xs text-gray-400'>
                    <h1 className='font-semibold text-white text-sm'>
                      {userInfo.name}
                    </h1>
                    <p>{userInfo.email}</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => signIn()}
                  className=' flex gap-5 items-center'
                >
                  <FaUserCircle className='text-3xl' />
                  <p className='text-bold text-lg font-[cursive]'>
                    Hello, sign In
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='space-y-2 h-screen overflow-y-scroll  p-3 text-[#101720]'>
            {menuItems.map((item: MenuItem) => (
              <div key={item.title} className='space-y-2 '>
                <h1 className='font-bold text-lg '>{item.title}</h1>
                <ul>
                  {item.items.map((item, index) => (
                    <li
                      key={index}
                      className='py-1 hover:bg-gray-200  cursor-pointer'
                    >
                      <Link
                        className='flex justify-between items-center'
                        href={'#'}
                      >
                        {item} <FaChevronRight className='text-gray-500' />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomHeader
