<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../js/productData.mts";
  import type { Product } from "../js/types.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import { getParam } from "../js/utils.mts";

  // declare these out here as state so we can us it in our template below 
  let products: Product[] = $state([]);
  let category = $state("");

  async function init() {
    category = getParam("category") || "";
    const data = await getProducts(category);
    products = data.results;
  }

  onMount(() => {
  init();
  });
</script>

<h2>Top products: {category}</h2>
<ul class="product-list">
    {#each products as product (product.id)}
        <ProductSummary {product} />
    {/each}
</ul>