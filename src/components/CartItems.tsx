import Image from 'next/image'
import { FormatPrice } from './FormatePrice'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from '@/store/nextSlice'
interface item {
  brand: string
  category: string
  description: string
  image: string
  isNew: boolean
  oldPrice: number
  price: number
  title: string
  _id: number
  quantity: number
}

interface cartProps {
  item: item
}

const CartItems = ({ item }: cartProps) => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className='flex bg-white p-1 w-full rounded mb-2 border-b items-start justify-between gap-10'>
        <div className='flex md:flex-row  flex-col py-3 items-center gap-4'>
          <div>
            <Image
              src={item.image}
              alt={item.title}
              width={130}
              height={130}
              className='object-cover aspect-square'
            />
          </div>
          <div className='space-y-1'>
            <h1 className='text-base font-semibold'>{item.title}</h1>
            <p className='text-sm font-light text-justify text-gray-500'>
              {item.description}
            </p>
           
            <div className='flex items-center gap-4'>
              <div className='flex gap-2 p-2 rounded-xl bg-white items-center'>
                <button>
                  <FaPlus
                    onClick={() =>
                      dispatch(
                        increaseQuantity({
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
                    className='text-orange-600 p-1 hover:bg-blue-200 transition-transform duration-700 hover:text-white   text-2xl rounded-lg'
                  />
                </button>
                {item.quantity}
                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
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
                >
                  <FaMinus className='text-orange-600 p-1 hover:bg-blue-200 transition-transform duration-700 hover:text-white   text-2xl rounded-lg' />
                </button>
              </div>
              <button
                onClick={() => dispatch(removeItem(item._id))}
                className='p-2 rounded-lg text-base shadow flex items-center gap-1  hover:bg-red-600 bg-red-400  text-white '
              >
                <FaTimes className='mt-[3px]' /> remove
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-lg'>
            {<FormatPrice amount={item.price} />}
          </h1>
        </div>
      </div>
     
      {/* <h1 className='font-medium text-lg'>
        Subtotal ({item.quantity} item):{' '}
        <span className='font-bold'>
          {' '}
          {<FormatPrice amount={item.price * item.quantity} />}
        </span>
      </h1> */}
    </div>
  )
}

export default CartItems
