import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
const Checkout = ({ cart }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    let myTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      myTotal += cart[i][1];
    }
    setSubtotal(myTotal);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    let orderId = 'OID' + Math.floor(100000 * Math.random());
    // console.log(orderId);

    let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders/pretransaction`;
    const rawResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        orderId: orderId,
        amount: subtotal,
        ...form,
        cart: cart,
      }),
    });
    const content = await rawResponse.json();

    // console.log(content);

    var config = {
      root: '',
      flow: 'DEFAULT',
      data: {
        orderId: orderId,
        token: content.body.txnToken,
        tokenType: 'TXN_TOKEN',
        amount: subtotal,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          // console.log('notifyMerchant handler function called');
          // console.log('eventName => ', eventName);
          // console.log('data => ', data);
        },
      },
    };
    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log('error => ', error);
        });
    }
  };

  return (
    <div>
      <Script
        id={'paytm'}
        type='application/javascript'
        crossorigin='anonymous'
        src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}></Script>

      <section className='text-gray-600 body-font relative'>
        <div className='container px-5 py-24 mx-auto min-h-screen'>
          <div className='flex flex-col text-center w-full mb-12'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
              Checkout
            </h1>
            <h2 className='text-4xl py-4 font-light'>Cart</h2>
            <div className='cart'>
              {' '}
              {cart.length ? (
                <h2 className='text-2xl font-light'>
                  Your cart details are as follows
                </h2>
              ) : (
                <h2 className='text-2xl font-light'>
                  EMPTY CART?? WHY DO YOU HATE ME?😔
                </h2>
              )}
            </div>
            <ul className='list-none list-inside m-2'>
              {cart.map((item) => {
                return (
                  <li key={Math.random()} className='px-8'>
                    {item[0]} with a price of ₹{item[1]}
                  </li>
                );
              })}
            </ul>
            {cart.length ? (
              <h2 className='text-2xl font-bold'>Subtotal: ₹{subtotal}</h2>
            ) : (
              <></>
            )}
          </div>
          {cart.length ? (
            <div className='lg:w-1/2 md:w-2/3 mx-auto'>
              <div className='flex flex-wrap -m-2'>
                <div className='p-2 w-1/2'>
                  <div className='relative'>
                    <label
                      htmlFor='name'
                      className='leading-7 text-sm text-gray-600'>
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      type='text'
                      id='name'
                      name='name'
                      value={form.name}
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                  </div>
                </div>
                <div className='p-2 w-1/2'>
                  <div className='relative'>
                    <label
                      htmlFor='email'
                      className='leading-7 text-sm text-gray-600'>
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      type='email'
                      id='email'
                      name='email'
                      value={form.email}
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                  </div>
                </div>
                <div className='p-2 w-1/2'>
                  <div className='relative'>
                    <label
                      htmlFor='email'
                      className='leading-7 text-sm text-gray-600'>
                      Phone
                    </label>
                    <input
                      onChange={handleChange}
                      type='text'
                      id='phone'
                      value={form.phone}
                      name='phone'
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    />
                  </div>
                </div>
                <div className='p-2 w-full'>
                  <div className='relative'>
                    <label
                      htmlFor='address'
                      className='leading-7 text-sm text-gray-600'>
                      Address
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={form.address}
                      id='address'
                      name='address'
                      className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'></textarea>
                  </div>
                </div>
                <div className='p-2 w-full'>
                  <button
                    onClick={submit}
                    className='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
                    Proceed to Payment
                  </button>
                </div>
                <div className='p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center'>
                  <span className='inline-flex'>
                    <Link href={'/'} className='text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                      </svg>
                    </Link>
                    <Link href={'/'} className='ml-4 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                      </svg>
                    </Link>
                    <Link href={'/'} className='ml-4 text-gray-500'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <rect
                          width='20'
                          height='20'
                          x='2'
                          y='2'
                          rx='5'
                          ry='5'></rect>
                        <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
                      </svg>
                    </Link>
                    <Link href={'/'} className='ml-4 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'>
                        <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                      </svg>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default Checkout;
