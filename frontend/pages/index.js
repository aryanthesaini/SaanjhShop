import route from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import candle from '../public/candle.jpg';
import Router from 'next/router';

export default function Home({ setViewNav }) {
  return (
    <div
      className='bg-cover flex flex-col '
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://images.unsplash.com/photo-1570823635306-250abb06d4b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}>
      <div className='px-5 py-5'>
        <h1
          onClick={() => {
            setViewNav(true);
          }}
          className='text-center text-white text-5xl font-light py-5 mt-10'>
          {' '}
          Saanjh Shop
        </h1>
        <h2 className='text-center text-white text-2xl font-thin py-5 mt-10'>
          Get a scented candle for each occasion, for your loved ones.
        </h2>
        <p className='text-center text-white py-5 mt-10'>
          <button
            className=' text-center text-white text-2xl font-thin py-2 inline-block px-6 border-2 border-blue-500leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mt-2'
            onClick={() => {
              setViewNav(true);
              Router.push('/products');
            }}>
            Click here to go Shopping
          </button>
        </p>
      </div>
    </div>
    // <div className='container mx-auto px-4'>
    //   {' '}
    //   <section className='text-gray-600 body-font'>
    //     <div className='container px-5 py-24 md:py-12 sm:py-4 mx-auto flex flex-col'>
    //       <div className='lg:w-4/6 mx-auto'>
    //         <div className='rounded-lg h-64 overflow-hidden'>
    //           <Image
    //             alt='content'
    //             className='object-cover object-center h-full w-full'
    //             src={candle}
    //           />
    //         </div>
    //         <div className='flex flex-col sm:flex-row mt-10'>
    //           <div className='sm:w-1/3 text-center sm:pr-8 sm:py-8'>
    //             <div className='w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400'>
    //               <svg
    //                 fill='none'
    //                 stroke='currentColor'
    //                 strokeLinecap='round'
    //                 strokeLinejoin='round'
    //                 strokeWidth='2'
    //                 className='w-10 h-10'
    //                 viewBox='0 0 24 24'>
    //                 <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
    //                 <circle cx='12' cy='7' r='4'></circle>
    //               </svg>
    //             </div>
    //             <div className='flex flex-col items-center text-center justify-center'>
    //               <h2 className='font-medium title-font mt-4 text-gray-900 text-lg'>
    //                 Saanjh Candles
    //               </h2>
    //               <div className='w-12 h-1 bg-indigo-500 rounded mt-2 mb-4'></div>
    //               <p className='text-base'>
    //                 This is your one place to get your loved ones a gift they
    //                 would adore.{' '}
    //               </p>
    //             </div>
    //           </div>
    //           <div className='sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left'>
    //             <p className='leading-relaxed text-lg mb-4'>
    //               Quoting Anne Frank, “Look at how a single candle can both,
    //               defy and define the darkness.” In a dark room when a candle is
    //               lit, the small flame from the candle doesn’t let the room be
    //               dark anymore. But just when that flame goes off, the room is
    //               dark again. After all what else is darkness other than the
    //               absence of light? This is why it is said that the candle can
    //               defy and define darkness.
    //             </p>
    //             <Link
    //               href={'/products'}
    //               className='text-indigo-500 inline-flex items-center cursor-pointer'>
    // GET SHOPPING
    // <svg
    //   fill='none'
    //   stroke='currentColor'
    //   strokeLinecap='round'
    //   strokeLinejoin='round'
    //   strokeWidth='2'
    //   className='w-4 h-4 ml-2'
    //   viewBox='0 0 24 24'>
    //   <path d='M5 12h14M12 5l7 7-7 7'></path>
    // </svg>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
}
