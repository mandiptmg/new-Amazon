'use client'
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaRegUser,
  FaSearch,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosArrowForward, IoMdArrowDropdown } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from '../../public/logo.png'
import cart from '../../public/cartIcon.png'
import { showAllData } from '@/data/Data'
import Link from 'next/link'
import BottomHeader from './BottomHeader'
import { StateProps, StoreProduct } from '@/types'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { addUser } from '@/store/nextSlice'
import SearchProducts from './SearchProducts'
import { motion } from 'framer-motion'
import { navItems } from '@/data/Data'
interface MenuItem {
  title: string
  items: string[]
}
interface showAllProps {
  id: number
  title: string
}
const Header = () => {
  // const [allData, setAllData] = useState([])
  const [slider, setSlider] = useState<boolean>(false)
  const [showAll, setShowAll] = useState<boolean>(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [all, setAll] = useState<string | null>(null)

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (slider) {
      const handler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setSlider(false)
        }
      }

      document.addEventListener('click', handler)

      return () => {
        document.removeEventListener('click', handler)
      }
    }
  }, [slider])
  const handleClick = (title: string) => {
    if (expandedCategory === title) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(title)
    }
  }

  const { data: session } = useSession()
  const { productData, favouriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  )
  const [totalQuantity, setTotalQuantity] = useState(0)
  // useEffect(() => {
  //   setAllData(allProducts.allProducts)
  // }, [allProducts])
  useEffect(() => {
    let quantity = 0
    productData.map((item: StoreProduct) => {
      quantity += item.quantity
      return
    })
    setTotalQuantity(quantity)
  }, [productData])
  const dispatch = useDispatch()
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
  }, [session, dispatch])
  useEffect(() => {
    const handleChange = () => {
      if (window.innerWidth >= 1024) {
        setSlider(false)
      }
    }

    handleChange() // Initial call to set the initial state

    window.addEventListener('resize', handleChange)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleChange)
    }
  }, [])
  // Search area
  const [searchQuery, setSearchQuery] = useState('')
  // const [filteredProducts, setFilteredProducts] = useState([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // useEffect(() => {
  //   const filtered = allData.filter((item: StoreProduct) =>
  //     item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   setFilteredProducts(filtered)
  // }, [allData,searchQuery])

  return (
    <div>
      <div className='bg-slate-950 text-white p-1 '>
        <div>
          <div className='flex w-full px-2 mx-auto h-auto justify-between gap-2 items-center'>
            {/* log and deliver */}
            <div className='flex items-center'>
              {/* log and bar */}
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setSlider(!slider)}
                  className='lg:hidden'
                >
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
                <div className='flex cursor-pointer p-2 border1 items-end'>
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
              <button
                onClick={() => setShowAll(!showAll)}
                className='rounded-l-md  flex gap-3 items-center text-xs text-[#101720] p-3 bg-gray-300 h-full '
              >
                {all || 'All'} <IoMdArrowDropdown />
              </button>
              {showAll && (
                <div className='absolute w-52 h-80 top-10 left-0 z-30 bg-white text-black overflow-x-hidden text-sm overflow-y-scroll'>
                  <ul>
                    {showAllData.map((item: showAllProps) => (
                      <li
                        onClick={() => {
                          setAll(item.title)
                          setShowAll(false)
                        }}
                        className='p-1 cursor-pointer hover:bg-gray-200'
                        key={item.id}
                        value={item.title}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <input
                onChange={handleSearch}
                value={searchQuery}
                className='w-full h-full rounded-r-md px-2 placeholder:text-sm text-base text-black  outline-none'
                type='text'
                placeholder='Search Amazon'
              />
              <button className='w-12 bg-yellow-500 h-full  text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md'>
                <FaSearch />
              </button>
              {/* {searchQuery && (
                <div className='absolute top-12 w-full mx-auto max-h-96 left-0 z-30 bg-gray-200 rounded-lg text-black overflow-x-hidden cursor-pointer overflow-y-scroll'>
                  {filteredProducts.map((item: StoreProduct) => (
                    <Link
                      href={{
                        pathname: `/${item._id}`,
                        query: {
                          item: JSON.stringify(item),
                        },
                      }}
                      onClick={() => setSearchQuery('')}
                      key={item._id}
                    >
                      <SearchProducts item={item} />
                    </Link>
                  ))}
                </div>
              )} */}
            </div>

            {/*flag and language list like signin order and cart */}
            <div className='flex items-center '>
              {/* flag and language */}
              <div className='hidden lg:block'>
                <div className='flex cursor-pointer items-center border1 p-[14px] gap-1'>
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
                <div className='hidden xs:block'>
                  <div className='inline-flex  items-center border1 cursor-pointer p-2 gap-1'>
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
                {userInfo ? (
                  <Link href='/favourite'>
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
                  </Link>
                ) : (
                  <div onClick={() => signIn()} className='cursor-pointer'>
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
                )}
              </div>
              {/* cart */}{' '}
              <Link href='/cart'>
                <div className='flex border1 p-3 items-end'>
                  <div className='relative'>
                    <Image src={cart} alt='cart' width={40} height={26} />

                    <span className='absolute -top-[6px] text-sm font-bold left-[45%] text-[#f08804]'>
                      {productData ? totalQuantity : null}
                    </span>
                  </div>
                  <h1 className='font-bold hidden lg:block text-sm'>Cart</h1>
                </div>{' '}
              </Link>
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

      {/* nav slider */}
      {slider && (
        <div className='w-full fixed top-0 z-30 left-0 duration-1000 h-screen  bg-black/70'>
          <div className='w-full h-full relative'>
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-[290px]  duration-700 h-screen absolute top-0 left-0 z-40 -trans  bg-gray-100`}
            >
              <button
                onClick={() => setSlider(false)}
                className='absolute top-5 -right-10 '
              >
                <FaTimes className='text-3xl font-light text-white  ' />
              </button>
              <div>
                <div className='bg-slate-900 cursor-pointer  py-4 px-5 text-white'>
                  {userInfo ? (
                    <div className='flex items-center cursor-pointer gap-5'>
                      <Image
                        src={userInfo.image}
                        width={40}
                        height={40}
                        alt={userInfo.name}
                        className='rounded-full object-cover '
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
                      className=' flex gap-5 items-center'
                    >
                      <FaUserCircle className='text-3xl' />
                      <p className='text-bold text-lg font-[cursive]'>
                        Hello, sign In
                      </p>
                    </div>
                  )}
                  <Link href='/'>
                    <h1 className='text-xl hover:text-gray-300 mt-4 font-bold'>
                      Browser <br />
                      <span className='text-3xl'>Amazon</span>
                    </h1>
                  </Link>
                </div>
              </div>
              <div className='overflow-y-scroll h-full text-[#101720]'>
                <Link href='/'>
                  <div
                    onClick={() => setSlider(false)}
                    className='flex border-b-2 pb-2 items-center justify-between p-3'
                  >
                    <h1 className='font-bold text-lg '>Amazon Home</h1>

                    <GoHome className='text-2xl' />
                  </div>
                </Link>
                <div>
                  {navItems.map((category: MenuItem, index) => (
                    <div key={index} className='border-b-2 pb-2'>
                      <h1 className='font-bold p-3 text-lg '>
                        {category.title}
                      </h1>
                      <div>
                        <ul className='text-[16px]'>
                          {expandedCategory === category.title
                            ? category.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                >
                                  <Link
                                    className='flex justify-between items-center'
                                    href={'#'}
                                  >
                                    {item}{' '}
                                    <FaChevronRight className='text-gray-500' />
                                  </Link>
                                </li>
                              ))
                            : category.items.slice(0, 4).map((item, idx) => (
                                <li
                                  key={idx}
                                  className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                >
                                  <Link
                                    className='flex justify-between items-center'
                                    href={'#'}
                                  >
                                    {item}{' '}
                                    <FaChevronRight className='text-gray-500' />
                                  </Link>
                                </li>
                              ))}
                        </ul>
                        {category.items.length > 4 && (
                          <button
                            onClick={() => handleClick(category.title)}
                            className='py-1 px-3 hover:text-black  w-full flex gap-3 items-center hover:bg-gray-200 cursor-pointer'
                          >
                            See{' '}
                            {expandedCategory === category.title
                              ? 'Less'
                              : 'All'}{' '}
                            <FaChevronDown
                              className={` text-gray-500 duration-700 ${
                                expandedCategory === category.title
                                  ? 'rotate-180'
                                  : 'null'
                              } `}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='h-[35vh]'></div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>

    // all input items
  )
}

export default Header
