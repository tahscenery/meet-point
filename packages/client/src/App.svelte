<script lang="ts">
  import router from "page";
  import { Content } from "carbon-components-svelte";

  import Header from "./components/Header.svelte";
  import Theme from "./components/Theme.svelte";

  import { About, Home, Login, NotFound, Register } from "./routes";

  let theme: "g10" = "g10";

  let page = undefined;
  let params = undefined;

  router("/", () => (page = Home));
  router("/about", () => (page = About));
  router("/login", () => (page = Login));
  router("/register", () => (page = Register));
  router("/*", () => (page = NotFound));

  router.start();
</script>

<Theme persist bind:theme>
  <Header />
  <Content>
    <svelte:component this={page} {params}/>
  </Content>
</Theme>
