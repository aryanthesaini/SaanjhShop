import React from 'react';
import Link from 'next/link'
const Products = (props) => {
  return (
    <div className='container mx-auto px-4'>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap w-full mb-20'>
            <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
              <h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900'>
                Welcome to Saanjh Shop
              </h1>
              <div className='h-1 w-20 bg-indigo-500 rounded'></div>
            </div>
            <p className='lg:w-1/2 w-full leading-relaxed text-gray-500'>
              Every type of candle for every occasion for your loved ones. Get
              the items customised as per your needs and we will deliver.
            </p>
          </div>
          <div className='flex flex-wrap -m-4'>
            {props.products.data.map((item) => {
              return (
                <div className='xl:w-1/4 md:w-1/2 p-4'>
                  <div className='bg-gray-100 p-6 rounded-lg'>
                    <img
                      className='h-60 rounded w-full object-cover object-center mb-6'
                      src={
                        item.attributes.image.data &&
                        `http://localhost:1337${item.attributes.image.data.attributes.url}`
                      }
                      alt={item.attributes.title}
                    />
                    <h3 className='tracking-widest text-indigo-500 text-xs font-medium title-font'>
                      {item.attributes.category}
                    </h3>
                    <h2 className='text-lg text-gray-900 font-medium title-font mb-4'>
                      {item.attributes.title}
                    </h2>
                    <div className='hidden bg-red-800 bg-green-800  bg-yellow-800 bg-blue-800'></div>
                    <button
                      className={
                        'border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none ' +
                        `bg-${item.attributes.scent}-800`
                      }></button>
                    <p className='leading-relaxed text-base'>
                      {item.attributes.description}
                    </p>
                    <Link href={`/product/${item.attributes.slug}`}>
                    <button className='inline-block px-6 py-3 border-2 border-blue-500 text-blue-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mt-2'>
                      Buy Now{' '}
                    </button>
                      </Link>
              
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  let headers = {
    Authorization:
      'Bearer 6e7013d11a2d0635b99c26b77c63519415ed5da024052aefe2db6678f82a515836dfdd3eef3448b0d78b79c30349aceb46bc4a281ad51ed2253b42babbc1b9f4afac70a7d1191766522e1f614ac2854d14ed46576b4e32b2477399791aca2f50a326aa7d1c81ad5280cb8af8a682a0a560e25c604e1090907c4451599ae964db',
  };
  let a = await fetch('http://localhost:1337/api/products?populate=*', {
    headers,
  });
  let products = await a.json();
  console.log(products);
  return {
    props: { products },
  };
}
export default Products;
