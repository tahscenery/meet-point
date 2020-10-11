import React from "react";

import {
  Header as CarbonHeader,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from "carbon-components-react";

import { AppSwitcher20, Settings20, UserAvatar20 } from "@carbon/icons-react";

const Header = () => (
  <CarbonHeader aria-label="Meet Point">
    <SkipToContent />
    <HeaderName href="/" prefix="Meet">
      Point
    </HeaderName>
    <HeaderNavigation aria-label="Carbon Tutorial">
      <HeaderMenuItem href="/feed">My Feed</HeaderMenuItem>
      <HeaderMenuItem href="/groups">My Groups</HeaderMenuItem>
    </HeaderNavigation>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Settings">
        <Settings20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="User Avatar">
        <UserAvatar20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="App Switcher">
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </CarbonHeader>
);

export default Header;
