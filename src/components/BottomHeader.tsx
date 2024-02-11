'use client'
import { StateProps } from '@/types/index'
import { LuMenu } from 'react-icons/lu'
import { signOut } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '@/store/nextSlice'

const BottomHeader = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  const dispatch = useDispatch()
  const handleSignOut = () => {
    signOut()
    dispatch(removeUser())
  }
  return (
    <div>
      <div className='w-full h-10 text-sm text-white px-4 flex items-center'>
        <p className='flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          <LuMenu className='text-xl' /> All
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          Todays Deals
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          Customer Service
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          Registry
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          Gift Cards
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-[10px] sm:text-sm md:text-base'>
          Sell
        </p>
        {userInfo ? (
          <p
            onClick={handleSignOut}
            className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-yellow-500 text-[10px] sm:text-sm md:text-base'
          >
            SignOut
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default BottomHeader
