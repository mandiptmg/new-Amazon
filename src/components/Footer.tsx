'use client'
import logo from '../../public/logo.png'
import flag from '../../public/flag.png'
import { AiOutlineGlobal } from 'react-icons/ai'
import Link from 'next/link'
import footerData, { amazonServices } from '../data/Data'
import Image from 'next/image'
interface MenuItem {
  title: string
  items: string[]
}

interface amazonService {
  id: string
  description: string
}
const Footer = () => {
  const time = new Date().getFullYear()
  return (
    <div className='bg-slate-800'>
      <div className='text-center cursor-pointer bg-slate-700 hover:bg-slate-600 py-4 text-white'>
        <h1 onClick={() => window.scrollTo(0, 0)}>Back to top</h1>
      </div>
      <div className='text-center'>
        <div className='grid md:grid-cols-4 sm:grid-cols-2  gap-10 pb-20 pt-10 px-5 lg:px-44'>
          {footerData.map((section: MenuItem) => (
            <div key={section.title} className='text-left space-y-2 text-white'>
              <h2 className='font-semibold text-lg'>{section.title}</h2>
              <ul className='text-gray-300 flex flex-col gap-1'>
                {section.items.map((item, i) => (
                  <li key={i} className='hover:underline cursor-pointer'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr />
        <div className='text-sm  py-10 text-gray-300 flex w-full text-center items-center justify-center gap-10 md:gap-20'>
          <Link href={'/'}>
            {' '}
            <Image
              src={logo}
              width={90}
              height={90}
              alt='logo'
              className='object-contain aspect-square '
            />
          </Link>
          <div className='flex flex-wrap gap-5 items-center'>
            <button className='py-1 px-2 items-center flex gap-2 border '>
              <AiOutlineGlobal className='text-white' />
              English
            </button>
            <button className='py-1 px-1  border '>$ USD - U.S. Dollar</button>
            <button className='px-2 py-1 items-cneter flex gap-2 border '>
              <Image
                src={flag}
                width={16}
                height={16}
                className='object-contain aspect-square '
                alt='logo'
              />
              Nepal
            </button>
          </div>
        </div>
      </div>
      <div className='bg-slate-950 text-white'>
        <div className=' gap-10 py-10 px-16 lg:px-44 grid sm:grid-cols-5 grid-cols-3  lg:grid-cols-7'>
          {amazonServices.map((section: amazonService) => (
            <div key={section.id} className='text-left text-xs text-white'>
              <h2 className='font-bold'>{section.id}</h2>
              <h2 className='text-gray-400'>{section.description}</h2>
            </div>
          ))}
        </div>
        <div className='text-center w-full pb-10 text-xs mx-auto text-gray-200'>
          <div className='flex justify-center gap-5 '>
            <p>
              <Link className='hover:underline' href='#'>
                Conditions of Use
              </Link>
            </p>
            <p>
              <Link className='hover:underline' href='#'>
                Privacy Notice
              </Link>
            </p>
            <p>
              <Link className='hover:underline' href='#'>
                Your Ads Privacy Choices
              </Link>
            </p>
          </div>
          <p className=''>
            &copy; 2023-{time}, Next_Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
