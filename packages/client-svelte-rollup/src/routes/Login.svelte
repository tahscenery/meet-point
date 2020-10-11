<script lang="ts">
  import { signIn } from "../auth/api";

  import { TextInput, PasswordInput, Checkbox } from "carbon-components-svelte";
  import { Form } from "../components";

  let email: string = "";
  let password: string = "";
  let rememberMe: boolean = false;

  function handleOnSubmit() {
    signIn({ email, password })
      .then(data => console.log(`TOKEN = '${data}'`))
      .catch(error => console.error(error));
  }
</script>

<Form
  title="Login"
  caption="Don't have an account?"
  captionLink={{ text: 'Create an account', link: '/register' }}
  primaryButtonText="Log in"
  on:submit={handleOnSubmit}>
  <div class="form-body-element">
    <TextInput
      light
      labelText="Email"
      placeholder="Enter your email..."
      bind:value={email} />
  </div>
  <div class="form-body-element">
    <PasswordInput
      light
      labelText="Password"
      placeholder="Enter your password..."
      bind:value={password} />
  </div>
  <Checkbox
    style="margin: 24px 0 0 0"
    labelText="Remember me"
    bind:checked={rememberMe} />
</Form>

<style>
  .form-body-element {
    margin-bottom: 16px;
  }
</style>
