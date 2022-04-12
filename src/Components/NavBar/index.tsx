/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SubMenu,
} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGauge,
  faBuildingColumns,
  // faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar';

type Props = {
  user: any;
  signOut: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  toggled: boolean;
  onToggle: any;
};

const NavBar = (props: Props) => {
  const { toggled, onToggle } = props;

  return (
    <ProSidebar toggled={toggled} breakPoint="md" onToggle={onToggle}>
      <SidebarHeader>
        <div className="sidebar-header">
          <NavLink to="/">
            <img
              src="/vault-logo.png"
              className="logo"
              width={110}
              height={60}
            />
          </NavLink>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<FontAwesomeIcon icon={faGauge} />}>
            <NavLink to="/">Dashboard</NavLink>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faBuildingColumns} />}>
            <NavLink to="/accounts">Accounts</NavLink>
          </MenuItem>
          {/* <MenuItem icon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />}>
            <NavLink to="/transactions">Transactions</NavLink>
          </MenuItem> */}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="square">
          <SubMenu
            title={props.user.attributes.name}
            icon={<Avatar size="40" name={props.user.attributes.name} />}
          >
            {/* <MenuItem>
              <NavLink to="/profile">Profile</NavLink>
            </MenuItem> */}
            <MenuItem>
              <div onClick={props.signOut}>Sign Out</div>
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default NavBar;
