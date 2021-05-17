import { useCartContext } from "../utils/context";
import CartItem from "./CartItem";
import React, { useState } from "react";
import Modal from "./Modal";

function Cart() {

  const { cartOpen, toggleCartVisibility, cart, removeAllItemsFromCart } = useCartContext();

  const orderTotal = cart.reduce((accumulator, { price, quantity }) => (price * quantity) + accumulator, 0);

  const [showModal, setShowModal] = useState(false);

  const [modalTitle, setModalTitle] = useState(null);

  const [modalContent, setModalContent] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const updatePhoneNumber = event => {
    setPhoneNumber(event.target.value);
  };

  const closeModal = () => {
    removeAllItemsFromCart();
    setPhoneNumber("");
    setShowModal(false);
  };

  const makeOrder = () => {
    fetch("api/order", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart, orderTotal, phoneNumber })
    })
      .then(response => response.json())
      .then(data => {
        setModalContent(data.message);
        setModalTitle("Success");
        setShowModal(true);
      });
  };

  return (
    <>
      <Modal
        title={modalTitle}
        message={modalContent}
        showModal={showModal}
        closeModal={closeModal}
      />
      <div
        className={`${
          cartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
        } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
          <button
            onClick={toggleCartVisibility}
            className="text-gray-600 focus:outline-none"
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
        </div>
        <hr className="my-3" />
        {cart.map(order => <CartItem key={order.id} {...order} />)}
        <div className="mt-8">
          <form className="flex items-center justify-center">
            <input
              className="form-input w-48"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onInput={updatePhoneNumber}
            />
          </form>
        </div>
        <hr className="my-3" />
        <span className="text-l font-medium text-gray-700 mr-48">Total</span>
        <span>${orderTotal}</span>
        <button
          onClick={makeOrder}
          className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <span>Checkout</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Cart;
