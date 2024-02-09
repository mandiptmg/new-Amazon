import { useDispatch } from 'react-redux'
import { resetItem } from '@/store/nextSlice'
const ResetCart = () => {
  const dispatch = useDispatch()
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      'Are you sure to reset your items from the cart?'
    )
    if (confirmReset) {
      dispatch(resetItem())
    }
  }
  return (
    <button
      onClick={handleResetCart}
      className='w-44 h-10 mt-4 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'
    >
      reset cart
    </button>
  )
}

export default ResetCart
