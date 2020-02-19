import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderLinks = this.renderLinks.bind(this);
  }

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            className={classes.active}
            onClick={this.clickHandler}
          >
            <i className={`fa ${link.icon}`}></i>
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) cls.push(classes.close);
    const links = [
      {
        to: "/list",
        label: "List",
        exact: true,
        icon: "fa-list"
      }
    ];

    if (this.props.isAuthenticated) {
      links.push(
        {
          to: "/quiz-creator",
          label: "Create a quiz",
          exact: false,
          icon: "fa-cogs"
        },
        {
          to: "/logout",
          label: "Logout",
          exact: false,
          icon: "fa-sign-out"
        }
      );
    } else {
      links.push({
        to: "/auth",
        label: "Authorization",
        exact: false,
        icon: "fa-sign-in"
      });
    }
    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>

        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
