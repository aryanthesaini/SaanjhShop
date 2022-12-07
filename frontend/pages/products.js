import React from 'react';
import Link from 'next/link';
const Products = (props) => {
  return (
    <div className='container mx-auto px-4'>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-12 mx-auto'>
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
                <div
                  key={item.attributes.slug}
                  className='xl:w-1/4 md:w-1/2 p-4'>
                  <div className='bg-gray-100 p-6 rounded-lg'>
                    <img
                      className='h-60 rounded w-full object-cover object-center mb-6'
                      src={
                        item.attributes.image.data &&
                        `${item.attributes.image.data.attributes.name}`
                      }
                      alt={item.attributes.title}
                    />
                    <h3 className='tracking-widest text-indigo-500 text-xs font-medium title-font'>
                      {item.attributes.category}
                    </h3>
                    <h2 className='text-lg text-gray-900 font-medium title-font mb-4'>
                      {item.attributes.title}
                    </h2>

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
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
  };
  let a = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`,
    {
      headers,
    }
  );
  let products = await a.json();
  // console.log(products);

  return {
    props: { products },
  };
}
export default Products;
