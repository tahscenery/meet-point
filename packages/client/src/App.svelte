<script lang="ts">
  import router from "page";
  import { Content, Link } from "carbon-components-svelte";

  import { Header, Theme } from "./components";
  import type { Theme as ThemeType } from "./components/Theme.svelte";
  import { About, Home, Login, NotFound, Register } from "./routes";

  let theme: ThemeType = "g10";
  let page = Home;
  let params = null;

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
    <Link inline href="/">Home</Link>
    <Link inline href="/about">About</Link>
    <Link inline href="/login">Login</Link>
    <Link inline href="/register">Register</Link>

    <svelte:component this={page} {params} />
  </Content>
</Theme>
