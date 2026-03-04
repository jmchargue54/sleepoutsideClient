<script lang="ts">
  import { onMount } from "svelte";
  import { getLocalStorage } from "../js/utils.mts";
  import type { Product } from "../js/types.mts";

  let cartItems: Product[] = [];

  onMount (() => {
    if (!localStorage.getItem('so-cart')) {
      localStorage.setItem('so-cart', '[]');
    }
    cartItems = getLocalStorage("so-cart") || [];
  });

  function removeCartItem(itemId: string) {
    cartItems = cartItems.filter((item: Product) => item.id !== itemId);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }

  $: cartTotal = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);
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
        <p class="cart-card__quantity">qty: 1</p>
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
