import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_RyzaaQm684AaxjNZ7CXmwJ6B00OXlCEPCW';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('Successful payment');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

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