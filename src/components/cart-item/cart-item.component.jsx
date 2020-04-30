import React from "react";

import {CartItemContainer, CartItemImg, ItemDetails} from "./cart-item.styles";

const CartItem = ({item: {imageUrl, name, price, quantity}}) => (
  <CartItemContainer>
    <CartItemImg src={imageUrl} alt='item' />
    <ItemDetails>
      <span>{name}</span>
      <span>{quantity} x ${price}</span>
    </ItemDetails>
  </CartItemContainer>
);

export default CartItem;