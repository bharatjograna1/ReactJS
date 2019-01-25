/**
 * Sidebar Content
 */
import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "Util/IntlMessages";

import NavMenuItem from "./NavMenuItem";

// redux actions
import { onToggleMenu } from "Actions";

class SidebarContent extends Component {
  toggleMenu(menu, stateCategory) {
    let data = {
      menu,
      stateCategory
    };
    this.props.onToggleMenu(data);
  }

  render() {
    const { sidebarMenus } = this.props.sidebar;
    return (
      <div className="jbs-sidebar-nav">
        <nav className="navigation">
          <List
            className="jbs-mainMenu p-0 m-0 list-unstyled"
            subheader={
              <ListSubheader className="side-title" component="li">
                <IntlMessages id="sidebar.general" />
              </ListSubheader>
            }
          >
            {sidebarMenus.my_account.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "my_account")}
              />
            ))}
            {sidebarMenus.category1.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "category1")}
              />
            ))}
          </List>
          <List
            className="jbs-mainMenu p-0 m-0 list-unstyled"
            subheader={
              <ListSubheader className="side-title" component="li">
                <IntlMessages id="sidebar.modules" />
              </ListSubheader>
            }
          >
            {sidebarMenus.category2.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "category2")}
              />
            ))}
          </List>
          <List
            className="jbs-mainMenu p-0 m-0 list-unstyled"
            subheader={
              <ListSubheader className="side-title" component="li">
                <IntlMessages id="sidebar.component" />
              </ListSubheader>
            }
          >
            {sidebarMenus.category3.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "category3")}
              />
            ))}
          </List>
          <List
            className="jbs-mainMenu p-0 m-0 list-unstyled"
            subheader={
              <ListSubheader className="side-title" component="li">
                <IntlMessages id="sidebar.features" />
              </ListSubheader>
            }
          >
            {sidebarMenus.category4.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "category4")}
              />
            ))}
          </List>
          <List
            className="jbs-mainMenu p-0 m-0 list-unstyled"
            subheader={
              <ListSubheader className="side-title" component="li">
                <IntlMessages id="sidebar.applications" />
              </ListSubheader>
            }
          >
            {sidebarMenus.category5.map((menu, key) => (
              <NavMenuItem
                menu={menu}
                key={key}
                onToggleMenu={() => this.toggleMenu(menu, "category5")}
              />
            ))}
          </List>
        </nav>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
  return { sidebar };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      onToggleMenu
    }
  )(SidebarContent)
);