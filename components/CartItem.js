import React from "react";
import { urlFor } from "../utils/sanity";
import Link from "next/link";
import { useCartContext } from "../utils/context";

const CartItem = ({
                    id,
                    title,
                    slug,
                    price,
                    quantity,
                    mainImage
                  }) => {

  const { removeOrderFromCart, updateOrderQuantity } = useCartContext();

  const handleRemoveButtonClick = () => {
    removeOrderFromCart(id);
  };

  const reduceOrderQuantity = () => {
    if (quantity > 1) {
      updateOrderQuantity(id, quantity - 1);
    } else {
      removeOrderFromCart(id);
    }
  };

  const increaseOrderQuantity = () => {
    updateOrderQuantity(id, quantity + 1);
  };

  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <button
          onClick={handleRemoveButtonClick}
          className="text-gray-600 focus:outline-none mx-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          className="h-20 w-20 object-cover rounded"
          src={urlFor(mainImage)
            .auto("format")
            .fit("crop")
            .width(750)
            .quality(80)}
          alt=""
        />
        <div className="mx-3">
          <Link href={`/products/${slug.current}`}>
            <a><h3 className="text-sm text-gray-600">{title}</h3></a>
          </Link>
          <div className="flex items-center mt-2">
            <button
              onClick={increaseOrderQuantity}
              className="text-gray-500 focus:outline-none focus:text-gray-600">
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
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <span className="text-gray-700 mx-2">{quantity}</span>
            <button
              onClick={reduceOrderQuantity}
              className="text-gray-500 focus:outline-none focus:text-gray-600">
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
      </div>
      <span className="text-gray-600">${quantity * price}</span>
    </div>
  );
};

export default CartItem;