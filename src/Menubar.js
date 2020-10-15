import React, { Component } from "react";
import { ReactPageClick } from "react-page-click";
import moment from "moment";

class MenubarItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { label, children } = this.props;
    return (
      <div className={"styles.item"}>
        <div onClick={this.handleMenuToggle}>{label}</div>
        {this.state.open && children ? (
          <ReactPageClick notify={this.handleMenuToggle}>
            <div className={"styles.menu"}>
              <div className={"styles.container"}>{children}</div>
              <div className={"styles.shadow"} />
            </div>
          </ReactPageClick>
        ) : null}
      </div>
    );
  }

  handleMenuToggle = () => {
    this.setState({ open: !this.state.open });
  };
}

class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({ time: moment(this.state.time).add(1, "month") });
    }, 10000);
  };

  render() {
    const { time } = this.state;
    return (
      <div className={"styles.menubar"}>
        <MenubarItem label="Projects">
          <div className={"styles.content"}>
            <p>
              I've been working in startups for a few years now. I always have
              some kind of side project or diversion taking my time when I'm not
              working on startups.
            </p>
          </div>
        </MenubarItem>
        <MenubarItem label="Help">
          <div className={"styles.content"}>
            <p>
              I don't really ever send emails. But if I ever do, I can send you
              one.
            </p>
          </div>
        </MenubarItem>
        <div className={"styles.time"}>
          {moment(time).format("MMM")}{" "}
          <strong>{moment(time).format("YYYY")}</strong>
        </div>
      </div>
    );
  }
}

export default Menubar;
