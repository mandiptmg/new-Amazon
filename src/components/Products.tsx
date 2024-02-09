'use client'
import { useEffect, useState } from 'react'
import { productProps } from '@/types'
import Image from 'next/image'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { FormatPrice } from './FormatePrice'
import Loading from '@/components/Loading'
import { useDispatch } from 'react-redux'
import {addToCart,addToFavourite} from '@/store/nextSlice'
const ProductList = () => {
  const [products, setProducts] = useState<productProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapiserver.reactbd.com/tech')
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        const products = await res.json()
        setProducts(products)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <span className='fixed top-0 w-screen h-screen grid place-items-center bg-white'>
        <Loading />
      </span>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className=' w-full h-full bg-gray-300 pb-10  '>
      <div className='grid w-[90vw] md:container mx-auto sm:grid-cols-2 relative z-20 xl:-mt-60 md:-mt-32   -mt-24 md:grid-cols-3 gap-3 lg:grid-cols-4 items-center'>
        {products.map((item: productProps) => (
          <div
            key={item._id}
            className='bg-white group p-4 overflow-hidden border border-gray-300 rounded-lg  '
          >
            <div className='relative w-full h-[260px] '>
              <Image
                className='w-full h-full object-contain transition-transform duration-500 scale-90 hover:scale-100'
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
              />
              <div className='absolute bottom-20 right-0 duration-500 group-hover:translate-x-0 transition-transform translate-x-20  w-12 h-auto grid text-xl place-items-center rounded-md'>
                <span
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: item._id,
                        title: item.title,
                        description: item.description,
                        oldPrice: item.oldPrice,
                        price: item.price,
                        brand: item.brand,
                        image: item.image,
                        isNew: item.isNew,
                        quantity: 1,
                      })
                    )
                  }
                  title='cart'
                  className='p-2 rounded-t-md cursor-pointer hover:bg-orange-400 border border-gray-400 '
                >
                  <FaShoppingCart />
                </span>
                <span
                  onClick={() =>
                    dispatch(
                      addToFavourite({
                        _id: item._id,
                        title: item.title,
                        description: item.description,
                        oldPrice: item.oldPrice,
                        price: item.price,
                        brand: item.brand,
                        image: item.image,
                        isNew: item.isNew,
                        quantity: 1,
                      })
                    )
                  }
                  title='favorite'
                  className='p-2 cursor-pointer rounded-b-md border hover:bg-orange-400 border-gray-400'
                >
                  <FaHeart />
                </span>
              </div>
              {item.isNew && (
                <p className='absolute duration-1000 animate-bounce top-0 right-0'>
                  !save <FormatPrice amount={item.oldPrice - item.price} />
                </p>
              )}
            </div>
            <hr />
            <div className='mt-2'>
              <h1 className='text-gray-400 text-sm'>{item.category}</h1>
              <h1 className='text-base font-medium'>{item.title}</h1>
              <div className='flex items-center gap-2'>
                <span className='line-through text-gray-400'>
                  <FormatPrice amount={item.oldPrice} />
                </span>
                <span className='font-medium'>
                  <FormatPrice amount={item.price} />
                </span>
              </div>
              <p className='text-justify text-gray-400 text-xs'>
                {item.description.slice(0, 110)}...
              </p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: item._id,
                      title: item.title,
                      description: item.description,
                      oldPrice: item.oldPrice,
                      price: item.price,
                      brand: item.brand,
                      image: item.image,
                      isNew: item.isNew,
                      quantity: 1,
                    })
                  )
                }
                className='mt-2 bg-slate-900 hover:bg-orange-600 font-medium duration-700 rounded-md text-white hover:text-slate-900 w-full text-center p-2 text-lg'
              >
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
