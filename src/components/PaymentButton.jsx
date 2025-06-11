import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51R3VesIW9dYCKtEBM5jSJbRTQtS0QNW39oxriypsZid5ylfygobTO3bi7fLPJI6v1I6uPItjhowowZzrCuE6kWMk00pHZHOcVb");

const CheckoutForm = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simulate payment success (test/demo mode)
    alert("✅ Payment successful!");
    onSuccess(); // Enable "Place Order" button
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              color: "#ffffff",
              fontSize: "16px",
              "::placeholder": { color: "#bbbbbb" },
            },
            invalid: { color: "#ff4d4d" },
          },
        }}
        className="p-3 bg-dark rounded"
      />
      <button type="submit" disabled={!stripe} className="btn btn-primary mt-3 w-100">
        Pay ₹{totalAmount.toFixed(2)}
      </button>
    </form>
  );
};

const PaymentButton = ({ totalAmount, onSuccess }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} onSuccess={onSuccess} />
  </Elements>
);

export default PaymentButton;
