'use client'
import { FormatPrice } from './FormatePrice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StateProps, StoreProduct } from '@/types'
import { SiMediamarkt } from 'react-icons/si'

const CartPayment = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)

  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  )
  useEffect(() => {
    let amount = 0
    let quantity = 0
    productData.map((item: StoreProduct) => {
      amount += item.price * item.quantity
      quantity += item.quantity
      return
    })
    setTotalAmount(amount)
    setTotalQuantity(quantity)
  }, [productData])
  return (
    <div className='w-[300px] px-3 py-5 space-y-2  bg-gray-100'>
      <div className='flex gap-2'>
        <span className='bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1'>
          <SiMediamarkt />
        </span>
        <p className='text-sm'>
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>

      <p className='px-2 text-lg font-semibold'>
        Subtotal ({totalQuantity} item):{' '}
        <span className='font-bold '>
          <FormatPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className='flex flex-col items-center'>
          <button className='w-full rounded-lg p-2 text-center bg-yellow-400 hover:bg-yellow-500 shadow-md text-sm '>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <button className='w-full cursor-not-allowed rounded-lg p-2 text-center bg-yellow-400 hover:bg-yellow-500 shadow-md text-sm '>
            Proceed to Checkout
          </button>
          <p className='text-xs mt-1 text-red-500 font-semibold animate-bounce'>
            Please login to continue
          </p>
        </div>
      )}
    </div>
  )
}

export default CartPayment
