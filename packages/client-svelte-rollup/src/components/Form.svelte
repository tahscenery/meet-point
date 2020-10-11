<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { Button, Form, Tile } from "carbon-components-svelte";
  import ArrowRight16 from "carbon-icons-svelte/lib/ArrowRight16";

  export let title: string = "Title";
  export let caption: string = "Caption";
  export let captionLink: { text: string; link: string } | null = null;

  export let secondaryButtonText: string | null = null;
  export let primaryButtonText: string = "Continue";

  let dispatch = createEventDispatcher();

  function handleOnSubmit() {
    dispatch("submit");
  }
</script>

<div class="form">
  <Tile style="padding: 0">
    <Form on:submit={handleOnSubmit}>
      <div class="form-content">
        <div class="form-header">
          <h3>{title}</h3>
          <p>
            {caption}
            {#if captionLink}
              <a href={captionLink.link}>{captionLink.text}</a>
            {/if}
          </p>
        </div>

        <div class="form-body">
          <hr class="form-body-element" />
          <slot />
        </div>
      </div>

      <div class="form-footer">
        <Button
          style="min-width: 50%; min-height: 4rem; padding-top: 0"
          type="submit"
          icon={ArrowRight16}
          on:click={handleOnSubmit}>
          {primaryButtonText}
        </Button>
        {#if secondaryButtonText}
          <Button
            style="min-width: 50%; min-height: 4rem; padding-top: 0"
            kind="secondary">
            {secondaryButtonText}
          </Button>
        {/if}
      </div>
    </Form>
  </Tile>
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }

  p {
    font-size: 0.875rem;
    color: var(--cds-text-02, #525252);
  }

  hr {
    border: none;
    border-top: 1px solid var(--cds-ui-03, #e0e0e0);
    margin-bottom: 16px;
  }

  .form {
    margin: 40px auto;
    max-width: 450px;
    padding: 0;
  }

  .form-content {
    padding: 16px 16px 40px 16px;
  }

  .form-header {
    margin-bottom: 48px;
  }

  .form-body-element {
    margin-bottom: 16px;
  }

  .form-footer {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
