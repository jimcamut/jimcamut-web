import React, { useState } from "react";
import { connect } from "react-redux";
import { updateMeta } from "../../redux/actions/meta";

const Header = props => {
  //const [menuOpen, setMenuOpen] = useState(false);

  // const {
  //   history: { location }
  // } = props;

  // const isLogin = ["/", "/register", "/login"].includes(location.pathname);

  // const toggleMenu = bool => {
  //   const val = typeof bool === "boolean" ? bool : !menuOpen;
  //   setMenuOpen(val);
  // };

  return (
    <>
      <div className="main-header">
        <div className="container">
          <p>Header</p>
        </div>
      </div>
      {/* <Menu {...props} isOpen={menuOpen} toggle={toggleMenu} /> */}
    </>
  );
};

export default connect(
  state => ({
    meta: state.meta
  }),
  dispatch => ({
    updateMeta: data => dispatch(updateMeta(data))
  })
)(Header);
