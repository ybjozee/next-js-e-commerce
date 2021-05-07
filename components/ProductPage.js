import { useState } from "react";
import { urlFor, PortableText } from "../utils/sanity";
import { useCartContext } from "../utils/context";

function ProductPage(props) {
  const {
    title, defaultProductVariant, mainImage,
    body, id: productId, slug
  } = props;

  const {
    findOrderInCart, addOrderToCart, removeOrderFromCart,
    updateOrderQuantity, showCart, toggleCartVisibility
  } = useCartContext();

  let orderInCart = findOrderInCart(productId);

  const [count, setCount] = useState(orderInCart?.quantity || 1);

  const handleCount = (value) =>
    !(count === 0 && value === -1) ? setCount(count + value) : count;

  const handleOrderButtonClick = () => {
    if (count === 0 && orderInCart) {
      removeOrderFromCart(productId);
      orderInCart = undefined;
    }
    if (!orderInCart && count > 0) {
      addOrderToCart({
        title,
        slug,
        id: productId,
        price: defaultProductVariant?.price,
        quantity: count,
        mainImage
      });
    }
    if (orderInCart) {
      updateOrderQuantity(productId, count);
    }
    showCart();
  };

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={urlFor(mainImage)
              .auto("format")
              .width(1051)
              .fit("crop")
              .quality(80)}
            alt={mainImage?.alt || `Photo of ${title}`}
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">{title}</h3>
          <span className="text-gray-500 mt-3">
            ${defaultProductVariant?.price}
          </span>
          <hr className="my-3" />
          <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Count:
            </label>
            <div className="flex items-center mt-1">
              <button onClick={() => handleCount(1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span className="text-gray-700 text-lg mx-2">{count}</span>
              <button onClick={() => handleCount(-1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button
              onClick={handleOrderButtonClick}
              className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
              Order Now
            </button>
            <button
              onClick={toggleCartVisibility}
              className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Description</h3>
        {body && <PortableText blocks={body?.en} className="text-gray-600" />}
      </div>
    </div>
  );
}

export default ProductPage;
