import { resetFavourite } from '@/store/nextSlice'
import { useDispatch } from 'react-redux'
const ResetFavoriteItems = () => {
  const dispatch = useDispatch()
  const handlerResetItem = () => {
    const confirmRest = window.confirm(
      'Are you sure to rest your items from the cart?'
    )
    if (confirmRest) {
      dispatch(resetFavourite())
    }
  }
  return (
    <div>
      <button
        onClick={handlerResetItem}
        className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'
      >
        reset cart
      </button>
    </div>
  )
}

export default ResetFavoriteItems
