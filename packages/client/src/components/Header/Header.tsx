import React from "react";

import {
  Header as CarbonHeader,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from "carbon-components-react";

import { Settings20, Login20, Person20 } from "@carbon/icons-react";

type HeaderProps = {
  children?: JSX.Element;
};

const Header = ({ children }: HeaderProps) => {
  const handleOnGlobalActionClick = (
    location: "Settings" | "Profile" | "Login"
  ) => {
    switch (location) {
      case "Settings":
        window.location.pathname = "/settings";
        break;
      case "Profile":
        window.location.pathname = "/register";
        break;
      case "Login":
        window.location.pathname = "/login";
        break;
    }
  };

  const MenuItems = () => (
    <>
      <HeaderMenuItem
        isCurrentPage={window.location.pathname === "/feed"}
        href="/feed"
      >
        My Feed
      </HeaderMenuItem>
      <HeaderMenuItem
        isCurrentPage={window.location.pathname === "/groups"}
        href="/groups"
      >
        My Groups
      </HeaderMenuItem>
    </>
  );

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          {/* Header */}
          <CarbonHeader aria-label="Group Interest">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="Group">
              Interest
            </HeaderName>

            {/* Header Navigation Links */}
            <HeaderNavigation aria-label="IBM [Platform]">
              <MenuItems />
            </HeaderNavigation>

            {/* Header Actions */}
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Settings"
                onClick={_ => handleOnGlobalActionClick("Settings")}
              >
                <Settings20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Profile"
                onClick={_ => handleOnGlobalActionClick("Profile")}
              >
                <Person20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Login"
                onClick={_ => handleOnGlobalActionClick("Login")}
              >
                <Login20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>

            {/* Side Navigation */}
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <MenuItems />
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </CarbonHeader>

          {/* Content */}
          {children}
        </>
      )}
    />
  );
};

export default Header;
