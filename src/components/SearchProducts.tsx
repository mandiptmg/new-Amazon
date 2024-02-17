import React from 'react'
import { FormatPrice } from './FormatePrice'
import Image from 'next/image'
interface props {
  brand: string
  category: string
  description: string
  image: string
  isNew: boolean
  oldPrice: number
  price: number
  title: string
  _id: number
}

interface item {
  item: props
}
const SearchProducts = ({ item }: item) => {
  return (
    <div className='flex items-center gap-4'>
      <Image
        className='w-24 object-contain aspect-ratio h-24 '
        width={24}
        height={24}
        src={item.image}
        alt='productImage'
      />
      <div>
        <p className='text-xs -mb-1'>
          {item.brand}_{item.category}
        </p>
        <p className='text-lg font-medium'>{item.title}</p>
        <p className='text-xs text-ellipsis'>
          {item.description.slice(0, 100)}
        </p>
        <p className='text-sm flex items-center gap-1'>
          price:{' '}
          <span className='font-semibold'>
            <FormatPrice amount={item.price} />
          </span>
          <span className='text-gray-600 line-through'>
            <FormatPrice amount={item.oldPrice} />
          </span>
        </p>
      </div>
      <div className='flex-1 text-right px-4'>
        <p className='text-base font-semibold animate-bounce text-amazon_blue'>
          Save <FormatPrice amount={item.oldPrice - item.price} />
        </p>
      </div>
    </div>
  )
}

export default SearchProducts
