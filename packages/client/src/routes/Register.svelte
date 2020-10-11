<script>
  import { TextInput, PasswordInput } from "carbon-components-svelte";
  import { Form } from "../components";
</script>

<Form
  title="Create an account"
  caption="Already have an account?"
  captionLink={{ text: 'Log in', link: '/login' }}>
  <div class="form-body-element">
    <TextInput light labelText="Email" placeholder="Enter your email..." />
  </div>
  <div class="form-body-element">
    <PasswordInput
      light
      labelText="Password"
      placeholder="Enter your password..." />
  </div>
  <div class="form-body-element">
    <PasswordInput
      light
      labelText="Confirm password"
      placeholder="Enter your password again..." />
  </div>
</Form>

<style>
  .form-body-element {
    margin-bottom: 16px;
  }
</style>
