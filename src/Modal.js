import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  static propTypes = {
    toggle: PropTypes.func,
  };

  render() {
    const { toggle, children } = this.props;
    return (
      <div className={"styles.container"}>
        <div className={"styles.contentContainer"}>
          <div className={"styles.content"}>{children}</div>
          <div className={"styles.shadow"} />
        </div>
        <div className={"styles.background"} onClick={toggle} />
      </div>
    );
  }
}

export default Modal;
