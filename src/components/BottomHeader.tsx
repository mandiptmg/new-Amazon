import { LuMenu } from 'react-icons/lu'

const BottomHeader = () => {
  return (
    <div>
      <div className='w-full h-10 text-sm text-white px-4 flex items-center'>
        <p className='flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          <LuMenu className='text-xl' /> All
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          Todays Deals
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          Customer Service
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          Registry
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          Gift Cards
        </p>
        <p className='inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 text-xs md:text-base'>
          Sell
        </p>
      </div>
    </div>
  )
}

export default BottomHeader
