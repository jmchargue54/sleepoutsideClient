<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../js/productData.mts";
  import type { Product } from "../js/types.mts";
  import ProductSummary from "./ProductSummary.svelte";

  // declare these out here as state so we can us it in our template below
  let { category } = $props(); 
  let products: Product[] = $state([]);

  async function init() {
    const data = await getProducts(category);
    products = data.results;
  }

  onMount(() => {
  init();
  });

  $inspect(category);
</script>

<h2>Top products: {category}</h2>
<ul class="product-list">
    {#each products as product}
        <ProductSummary {product} />
    {/each}
</ul>