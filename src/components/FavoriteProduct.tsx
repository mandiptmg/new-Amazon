import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeFavourite } from '@/store/nextSlice'
import { FormatPrice } from './FormatePrice'
interface Item {
  _id: number
  brand: string
  category: string
  description: string
  image: string
  isNew: boolean
  oldPrice: number
  price: number
  title: string
  quantity: number
}
interface cartProductProps {
  item: Item
}

const FavoriteProduct = ({ item }: cartProductProps) => {
  const dispatch = useDispatch()
  return (
    <div className='bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2'>
      <Image src={item.image} alt='Product image' width={150} height={150} />
      <div className='flex items-center px-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-semibold text-amazon_blue'>{item.title}</p>
          <p className='text-sm text-gray-500'>{item.description}</p>
          <p className='text-sm text-gray-600'>
            Unit price:{' '}
            <span className='font-semibold text-amazon_blue'>
              <FormatPrice amount={item.price} />
            </span>
          </p>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    _id: item._id,
                    brand: item.brand,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    isNew: item.isNew,
                    oldPrice: item.oldPrice,
                    price: item.price,
                    title: item.title,
                    quantity: 1,
                  })
                )
              }}
              className='w-44 h-10 font-medium  rounded-md bg-yellow-400 duration-300 text-black mt-2'
            >
              add to cart
            </button>

            <button
              className='w-44 h-10 font-medium  rounded-md bg-red-400 duration-300 text-black mt-2'
              onClick={() => dispatch(removeFavourite(item._id))}
            >
              remove
            </button>
          </div>
        </div>
        <div className='text-lg font-semibold text-amazon_blue'>
          <FormatPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  )
}

export default FavoriteProduct
