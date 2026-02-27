import { mount } from 'svelte';
import ShoppingCart from '../components/ShoppingCart.svelte';

mount(ShoppingCart, {
  target: document.querySelector('#cart-container') as HTMLElement,
});