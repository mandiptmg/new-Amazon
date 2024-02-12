'use client'
import { FaBars, FaRegUser, FaSearch } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward, IoMdArrowDropdown } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../../public/logo.png'
import cart from '../../public/cartIcon.png'
import Link from 'next/link'
import BottomHeader from './BottomHeader'
import { usePathname } from 'next/navigation'
import { StateProps, StoreProduct } from '@/types'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { addUser } from '@/store/nextSlice'
import SearchProducts from './SearchProducts'
const Header = () => {
  const [allData, setAllData] = useState([])
  const { data: session } = useSession()
  const { productData, favouriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  )
  const dispatch = useDispatch()
  useEffect(() => {
    setAllData(allProducts.allProducts)
  }, [allProducts])
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      )
    }
  }, [session])
  // Search area
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // useEffect(() => {
  //   const filtered = allData.filter((item: StoreProduct) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   setFilteredProducts(filtered)
  // }, [searchQuery])

  return (
    <div>
      <div className='bg-slate-950 text-white p-1 '>
        <div>
          <div className='flex w-full px-4 mx-auto h-auto justify-between gap-2 items-center'>
            {/* log and deliver */}
            <div className='flex items-center'>
              {/* log and bar */}
              <div className='flex items-center gap-2'>
                <button className='lg:hidden'>
                  <FaBars className='text-xl' />
                </button>
                <div className='border1 p-2'>
                  <Link href='/'>
                    <Image
                      src={logo}
                      alt='logo'
                      width={113}
                      height={50}
                      className='aspect-auto'
                    />
                  </Link>
                </div>
              </div>
              {/* deliver and location */}
              <div className='hidden lg:block'>
                <div className='flex p-2 border1 items-end'>
                  <FaLocationDot className='text-base ' />
                  <h1 className='text-xs text-gray-400'>
                    Deliver to <br />{' '}
                    <span className='text-white text-sm font-bold'>Nepal</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* input and buttom */}

            <div className='flex-1 h-10 hidden lg:inline-flex items-center justify-between relative'>
              <input
                onChange={handleSearch}
                value={searchQuery}
                className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black  outline-none focus-visible:outline-yellow-500'
                type='text'
                placeholder='Search Amazon'
              />
              <button className='w-12 bg-yellow-500 h-full  text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md'>
                <FaSearch />
              </button>
              {searchQuery &&
                filteredProducts.map((item: StoreProduct) => (
                  <Link
                    href={{
                      pathname: `${item._id}`,
                      query: {
                        _id: item._id,
                        title: item.title,
                        description: item.description,
                        oldPrice: item.oldPrice,
                        price: item.price,
                        brand: item.brand,
                        image: item.image,
                        isNew: item.isNew,
                      },
                    }}
                    onClick={() => setSearchQuery('')}
                    key={item._id}
                  >
                    <SearchProducts item={item} />
                  </Link>
                ))}
            </div>

            {/*flag and language list like signin order and cart */}
            <div className='flex items-center '>
              {/* flag and language */}
              <div className='hidden lg:block'>
                <div className='flex items-center border1 p-[14px] gap-1'>
                  <div>
                    <Image
                      src={
                        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041'
                      }
                      width={20}
                      className='w-[21.6px] h-[16.2px] object-cover'
                      height={35}
                      alt='flag'
                    />
                  </div>
                  <div className='flex items-end'>
                    <h1 className='font-bold'>EN</h1>
                    <IoMdArrowDropdown className='text-gray-300 text-sm' />
                  </div>
                </div>
              </div>
              {/* sign in and out */}
              {userInfo ? (
                <div className='flex items-center border1 cursor-pointer p-2 gap-1'>
                  <Image
                    src={userInfo.image}
                    width={50}
                    height={50}
                    alt={userInfo.name}
                    className='w-8 h-8 rounded-full object-cover '
                  />
                  <div className='text-xs text-gray-400'>
                    <h1 className='font-semibold text-white text-sm'>
                      {userInfo.name}
                    </h1>
                    <p>{userInfo.email}</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => signIn()}
                  className='border1 cursor-pointer p-2'
                >
                  <div className='hidden lg:block'>
                    <h1 className='text-xs  text-gray-400'>
                      Hello, sign in <br />
                      <span className='text-sm flex items-end font-bold text-white'>
                        Acount & Lists
                        <IoMdArrowDropdown className='text-gray-300 text-sm' />
                      </span>
                    </h1>
                  </div>
                  <div className='flex  lg:hidden gap-1 items-center'>
                    <h1 className='text-sm font-bold'>Sign In</h1>
                    <IoIosArrowForward className='text-sm' />
                    <FaRegUser className='text-xl' />
                  </div>
                </div>
              )}

              {/* return and order */}
              <div className='border1 p-2 hidden lg:block'>
                <h1 className='text-xs relative text-gray-400'>
                  Returns <br />
                  <span className='text-sm font-bold text-white'>
                    & Orders{' '}
                  </span>
                  {favouriteData.length > 0 && (
                    <span className='absolute top-0 text-xs font-bold -right-1 py-[1px] px-[2px] border  text-[#f08804]'>
                      {favouriteData.length}
                    </span>
                  )}
                </h1>
              </div>
              {/* cart */}
              <div className='flex border1 p-3 items-end'>
                <div className='relative'>
                  <Link href='/cart'>
                    <Image src={cart} alt='cart' width={40} height={26} />
                  </Link>
                  <span className='absolute -top-1 text-sm font-bold left-[45%] text-[#f08804]'>
                    {productData ? productData.length : 0}
                  </span>
                </div>
                <h1 className='font-bold hidden lg:block text-sm'>Cart</h1>
              </div>
            </div>
          </div>
        </div>
        {/* responsive input  */}
        <div className='w-full mt-1 px-1 lg:hidden'>
          <form className='flex items-center'>
            <input
              type='text'
              className='px-[10px] w-full text-black py-[7px] rounded-l outline-none'
              placeholder='search amazon'
            />
            <button className='p-[7px] rounded-r bg-orange-400 hover:bg-orange-500'>
              <FaSearch className='text-2xl text-gray-800  ' />
            </button>
          </form>
        </div>
        {/* bottom Header */}
        <div className='lg:hidden'>
          <BottomHeader />
        </div>
      </div>
      {/* bottom location and delivery */}
      <div className='lg:hidden text-white px-4 py-2 bg-slate-700'>
        <div className='flex border1 items-center gap-2'>
          <FaLocationDot className='text-lg ' />
          <h1 className='text-white text-base font-semibold '>
            Deliver to Nepal
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Header
