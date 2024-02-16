'use client'
import { FormatPrice } from '@/components/FormatePrice'
import {
  addToCart,
  addToFavourite,
  decreaseQuantity,
  increaseQuantity,
} from '@/store/nextSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaHeart, FaMinus, FaPlus } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

interface Product {
  _id: string
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

const Page = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const item = searchParams.get('item')
    if (item) {
      try {
        const parsedItem = JSON.parse(item) as Product
        setProduct(parsedItem)
      } catch (error) {
        console.error('Error parsing item:', error)
      }
    }
  }, [searchParams])

  return (
    <div>
      {product ? (
        <div className=' bg-gray-100 '>
          <div className='text-lg p-4  '>
            <Link href='/' className='text-yellow-600 hover:text-yellow-500 '>
              Home
            </Link>
            /
            <span className='font-semibold text-[#011222]'>
              {product.title}
            </span>
          </div>
          <div className='p-4 w-[90vw] mx-auto md:w-[80vw] grid md:grid-cols-3 gap-3  rounded-lg'>
            <div className='flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden'>
              <Image
                src={product.image}
                alt='product image'
                width={500}
                height={500}
              />
              <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300'>
                <span
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'
                >
                  <HiShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addToFavourite({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'
                >
                  <FaHeart />
                </span>
              </div>
            </div>
            <div className='md:col-span-2 flex flex-col gap-3 justify-center p-4'>
              <p className='text-xs md:text-sm text-amazon_blue font-semibold -mb-3'>
                {product.category}_{product.brand}
              </p>
              <h1 className='text-xl md:text-3xl tracking-wide font-semibold'>
                {product.title}
              </h1>
              <p className='text-sm text-gray-600'>{product.description}</p>
              <div>
                <p className='text-base text-gray-600 flex items-center gap-1'>
                  Price:
                  <span className='text-lg text-amazon_blue font-semibold'>
                    <FormatPrice amount={product.price} />
                  </span>
                  <span className='ml-1 line-through'>
                    <FormatPrice amount={product.oldPrice} />
                  </span>
                </p>
                <p className='text-sm text-gray-500 flex items-center gap-1'>
                  Your saved:{' '}
                  <span>
                    <FormatPrice amount={product.oldPrice - product.price} />
                  </span>
                </p>
               
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: product._id,
                        brand: product.brand,
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        isNew: product.isNew,
                        oldPrice: product.oldPrice,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    )
                  }
                  className='px-4 py-2 bg-yellow-400  hover:bg-yellow-500 text-black duration-300 rounded-lg mt-5 text-base font-semibold'
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  )
}

export default Page
