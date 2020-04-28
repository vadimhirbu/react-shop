import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_RyzaaQm684AaxjNZ7CXmwJ6B00OXlCEPCW';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Succesful!s');
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Midav SRL.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      alipay
      bitcoin
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeButton;