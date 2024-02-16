import Banner from '@/components/Banner'
import Products from '@/components/Products'
import SignIn from '@/components/SignIn'

const Home = () => {
  return (
    <main>
      <Banner />
      <div className=''>
        <Products />
      </div>
      <hr className='my-2 px-10' />
      <div className=' py-4 text-sm grid place-items-center '>
      <SignIn/>
      </div>
      <hr className='my-2' />
    </main>
  )
}

export default Home
