'use client'
import { StateProps } from '@/types/index'
import { LuMenu } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { signIn, signOut } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '@/store/nextSlice'
import { useEffect, useRef, useState } from 'react'
import {
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa'
import Image from 'next/image'
import { menuItems } from '@/data/Data'
import Link from 'next/link'

interface MenuItem {
  title: string
  items: string[]
}

const BottomHeader = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleClick = (title: string) => {
    if (expandedCategory === title) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(title)
    }
  }
  const [menuItem, setMenuItem] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (menuItem) {
      const handler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setMenuItem(false)
        }
      }

      document.addEventListener('click', handler)

      return () => {
        document.removeEventListener('click', handler)
      }
    }
  }, [menuItem])

  const { userInfo } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut()
    dispatch(removeUser())
  }
  return (
    <div>
      <div className='w-full md:overflow-hidden overflow-x-scroll'>
        <ul className='inline-flex text-white  text-base sm:w-full w-[550px] items-start py-1 mx-auto'>
          <li
            className='hidden lg:inline-flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white '
            onClick={() => setMenuItem(!menuItem)}
          >
            <LuMenu className='text-2xl ' /> All
          </li>
          <li className='cursor-pointer px-2 py-1 border border-transparent hover:border-white  '>
            Todays Deals
          </li>
          <li className='cursor-pointer px-2 py-1 border border-transparent hover:border-white '>
            Customer Service
          </li>
          <li className='cursor-pointer px-2 py-1 border border-transparent hover:border-white '>
            Registry
          </li>
          <li className='cursor-pointer px-2 py-1 border border-transparent hover:border-white '>
            Gift Cards
          </li>
          <li className='cursor-pointer px-2 py-1 border border-transparent hover:border-white '>
            Sell
          </li>
          {userInfo ? (
            <li
              onClick={handleSignOut}
              className='text-yellow-500 cursor-pointer px-2 py-1 border border-transparent hover:border-white '
            >
              SignOut
            </li>
          ) : null}
        </ul>
      </div>

      {/*slide  menuitem */}
      {menuItem && (
        <div className='w-full fixed top-0 z-30 left-0 duration-1000 h-screen  bg-black/70'>
          <div className='w-full h-full relative'>
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-[370px] duration-700 h-screen absolute top-0 left-0 z-40 -trans  bg-gray-100`}
            >
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
              <div className='overflow-y-scroll h-full text-[#101720]'>
                <div>
                  {menuItems.map((category: MenuItem, index) => (
                    <div key={index}>
                      <h1 className='font-bold p-3 text-lg '>
                        {category.title}
                      </h1>
                      <div>
                        <ul className='text-[16px]'>
                          {expandedCategory === category.title
                            ? category.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                >
                                  <Link
                                    className='flex justify-between items-center'
                                    href={'#'}
                                  >
                                    {item}{' '}
                                    <FaChevronRight className='text-gray-500' />
                                  </Link>
                                </li>
                              ))
                            : category.items.slice(0, 4).map((item, idx) => (
                                <li
                                  key={idx}
                                  className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                >
                                  <Link
                                    className='flex justify-between items-center'
                                    href={'#'}
                                  >
                                    {item}{' '}
                                    <FaChevronRight className='text-gray-500' />
                                  </Link>
                                </li>
                              ))}
                        </ul>
                        {category.items.length > 4 && (
                          <button
                            onClick={() => handleClick(category.title)}
                            className='py-1 px-3 hover:text-black  w-full flex gap-3 items-center hover:bg-gray-200 cursor-pointer'
                          >
                            See{' '}
                            {expandedCategory === category.title
                              ? 'Less'
                              : 'All'}{' '}
                            <FaChevronDown
                              className={` text-gray-500 duration-700 ${
                                expandedCategory === category.title
                                  ? 'rotate-180'
                                  : 'null'
                              } `}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='space-y-2 p-3 h-[35vh] border-b-[3px] '>
                  <h1 className='font-bold text-lg '>Help & Settings</h1>
                  <ul>
                    <li className='py-1 hover:bg-gray-200  cursor-pointer'>
                      <Link href={'#'}>Your Account</Link>
                    </li>
                    <li className='py-1 hover:bg-gray-200  cursor-pointer'>
                      <Link href={'#'}>Customer Service</Link>
                    </li>
                    {userInfo ? (
                      <li
                        onClick={() => signOut()}
                        className='py-1 hover:bg-gray-200  cursor-pointer'
                      >
                        Sign Out{' '}
                      </li>
                    ) : (
                      <li
                        onClick={() => signIn()}
                        className='py-1 hover:bg-gray-200  cursor-pointer'
                      >
                        Sign In{' '}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BottomHeader
