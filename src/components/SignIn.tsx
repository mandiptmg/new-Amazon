'use client'
import { StateProps } from '@/types'
import { signIn } from 'next-auth/react'
import { useSelector } from 'react-redux'
const SignIn = () => {
  const { userInfo } = useSelector((state: StateProps) => state.next)
  return (
    <div>
      <div className='text-center space-y-1'>
        <p>See personalized recommendations</p>
        <button
          onClick={() => signIn()}
          className='bg-yellow-400 text-sm py-1 rounded-md font-semibold px-24  border-1 border-yellow-600'
        >
          Sign {userInfo ? 'out' : 'in'}
        </button>
        <p className='text-xs pb-4'>
          New customer? <span className='text-slate-600'>Start here.</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn
