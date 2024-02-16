'use client'
import Link from 'next/link'
import { StateProps, StoreProduct } from '@/types'
import { useSelector } from 'react-redux'
import CartItems from './CartItems'
// import Image from 'next/image'
import ResetCart from './ResetCart'
import CartPayment from './CartPayment'

const CartProduct = () => {
  const { productData } = useSelector((state: StateProps) => state.next)
  return (
    <div>
      <div className='max-w-screen mx-auto px-6 py-4 '>
        {productData.length > 0 ? (
          <div className='flex min-h-screen flex-col md:flex-row md:items-start gap-10'>
            <div className='bg-gray-100 px-4  py-3 col-span-4'>
              <div className='flex pb-2 px-2 border-b-[1px] w-full justify-between items-center'>
                <p className='text-lg md:text-2xl   font-semibold text-slate-900'>
                  Shopping Cart
                </p>
                <p className='md:text-xl hidden lg:block text-lg font-semibold text-slate-900'>
                  Price
                </p>
              </div>

              <div className='py-2'>
                {productData.map((item: StoreProduct) => {
                  return (
                    <div key={item._id}>
                      <CartItems item={item} />
                    </div>
                  )
                })}
                <ResetCart />
              </div>
            </div>
            <div>
              <CartPayment />
            </div>
          </div>
        ) : (
          <div className='h-[75vh] grid  place-items-center'>
            <div className='flex flex-col items-center col-span-7 gap-3'>
              <iframe
                src='https://giphy.com/embed/WAQiH273h7nTChAbHu'
                width='200'
                height='200'
                className='rounded-full'
                allowFullScreen
              ></iframe>

              <p className='text-xl md:text-2xl  font-bold '>
                Your Amazon Cart is empty
              </p>
              <Link href='/'>
                <button className='text-sm text-teal-600'>
                  Shop todays deals
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartProduct
