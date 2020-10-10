<script>
  import {
    Button,
    Form,
    PasswordInput,
    TextInput,
  } from "carbon-components-svelte";

  import ArrowRight16 from "carbon-icons-svelte/lib/ArrowRight16";
</script>

<div class="form">
  <Form on:submit>
    <h3>Create an account</h3>
    <p>Already have an account? <a href="/login">Log in</a></p>

    <div class="form-content">
      <div class="form-element">
        <TextInput labelText="Email" placeholder="username@email.com" />
      </div>
      <div class="form-element">
        <PasswordInput labelText="Password" placeholder="••••••••" />
      </div>
      <div class="form-element">
        <PasswordInput labelText="Confirm password" placeholder="••••••••" />
      </div>
    </div>

    <div class="footer">
      <Button style="min-width: 150px" icon={ArrowRight16}>Continue</Button>
    </div>
  </Form>
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }

  .form {
    margin: 40px auto;
    max-width: 450px;
    padding: 16px;
  }

  .form-content {
    margin: 48px auto;
  }

  .form-element {
    margin-bottom: 24px;
  }

  .footer {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
