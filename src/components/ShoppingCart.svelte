<script lang="ts">
  import { onMount } from "svelte";
  import { getLocalStorage } from "../js/utils.mts";
  import type { Product } from "../js/types.mts";

  let cartItems: Product[] = [];
  let cartQuantity: number = 1;

  onMount (() => {
    if (!localStorage.getItem('so-cart')) {
      localStorage.setItem('so-cart', '[]');
    }
    const storedItems: Product[] = getLocalStorage("so-cart") || [];

    const grouped: Record<string, CartItem> = {};

    storedItems.forEach((item) => {
      if (grouped[item.id]) {
        grouped[item.id].quantity += 1;
      } else {
        grouped[item.id] = { ...item, quantity: 1 };
      }
    });

    cartItems = Object.values(grouped);
  });

  function removeCartItem(itemId: string) {
    cartItems = cartItems
      .map((item) => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
      .filter((item) => item.quantity > 0);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }

  $: cartTotal = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity, 0);
</script>

{#if cartItems.length === 0}
  <ul class="product-list">
    <p class="empty-cart">Your cart is empty.</p>
  </ul>
{:else}
  <ul class="product-list">
    {#each cartItems as item (item.id)}
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img
            src={item.images.primaryMedium}
            alt={item.name}
          />
        </a>
        <a href="#">
          <h2 class="card__name">{item.name}</h2>
        </a>
        <p class="cart-card__color">{item.colors[0].colorName}</p>
        <p class="cart-card__quantity">qty: {item.quantity}</p>
        <button 
          class="cart-card__remove" 
          on:click={() => removeCartItem(item.id)}
          aria-label="Remove {item.name} from cart"
        >
          <img
            src="/images/bin.png" 
            alt="remove item" 
            id="remove-{item.id}"
          />
        </button>
        <p class="cart-card__price">${item.finalPrice}</p>
      </li>
    {/each}
  </ul>
  <footer>
    <p class="cart-total">Total: ${cartTotal.toFixed(2)}</p>
  </footer>
{/if}
