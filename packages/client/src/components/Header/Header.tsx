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

import { Settings20, Login20 } from "@carbon/icons-react";

const Header = () => {
  return (
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
        <HeaderGlobalAction aria-label="Login">
          <Login20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
