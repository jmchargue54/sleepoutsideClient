<script lang="ts">
  import { register} from "../js/auth.svelte.ts";
  import { onMount } from "svelte";
  import { getParam } from "../js/utils.mts";

  let {
    onSuccess = (path:string) => {
      window.location.href = path;
    }
  } = $props<{
    onSuccess?: (data: { email: string }) => void;
  }>();

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let errorMessage = $state("");
  let redirectPath = "/";

  async function registerHandler(event: Event) {
    event.preventDefault();
    // Handle registration logic here
    try {
      const results = await register(name, email, password);

      onSuccess(redirectPath);
    } catch (error: any) {
      console.log(error);
      errorMessage = error.message;
    }
  }

  onMount(() => {
    // we added the getParam function to utils in Team 5
    const param = getParam("redirect");
    if (param) {
        redirectPath = param;
    } else if (document.referrer != window.location.href) {
        redirectPath = document.referrer;
    }
});
</script>

<h2>Register</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={registerHandler} class="register-form">
 <label>
    Name:
    <input type="text" bind:value={name} required />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <button type="submit">Sign Up</button>
</form>

<style>
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>