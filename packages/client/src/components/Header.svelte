<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
  } from "carbon-components-svelte";

  import Login20 from "carbon-icons-svelte/lib/Login20";
  import AppSwitcher20 from "carbon-icons-svelte/lib/AppSwitcher20";
  import { getContext } from "svelte";

  const ctx: { dark: any; light: any; updateVar: any } = getContext("Theme");

  $: if (ctx) {
    ctx.dark.subscribe(value => {
      console.log("dark mode?", value);
    });
    ctx.light.subscribe(value => {
      console.log("light mode?", value);
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }

  function handleLoginActionClicked(_: any) {
    console.log("Header.handleLoginActionClicked");
  }
</script>

<Header company="Meet" platformName="Point" href="/">
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderGlobalAction
      aria-label="Login"
      icon={Login20}
      on:click={handleLoginActionClicked} />
    <HeaderGlobalAction aria-label="App Switcher" icon={AppSwitcher20} />
  </HeaderUtilities>
</Header>
