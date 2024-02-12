'use client'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import sliderImg_1 from '../../public/banner/img1.jpg'
import sliderImg_2 from '../../public/banner/img2.jpg'
import sliderImg_3 from '../../public/banner/img3.jpg'
import sliderImg_4 from '../../public/banner/img4.jpg'

import Image from 'next/image'

const Banner = () => {
  return (
    <div className='relative'>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image
            priority
            src={sliderImg_1}
            alt='sliderImg'
            className='object-cover w-screen h-[80vh]  '
          />
        </div>
        <div>
          <Image
            src={sliderImg_2}
            alt='sliderImg'
            className='object-cover w-screen h-[80vh]  '
          />
        </div>
        <div>
          <Image
            src={sliderImg_3}
            alt='sliderImg'
            className='object-cover w-screen h-[80vh]  '
          />
        </div>
        <div>
          <Image
            src={sliderImg_4}
            alt='sliderImg'
            className='object-cover w-screen h-[80vh]  '
          />
        </div>
      </Carousel>
      <div className='w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20'></div>
    </div>
  )
}

export default Banner
