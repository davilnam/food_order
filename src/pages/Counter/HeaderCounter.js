import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/actions";

const HeaderCounter = () => {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.app);
  user = {title: "nam", userId: 2} 

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="md">
      <div className="container d-flex justify-content-between">
        <NavbarBrand href="/counter">Order Management</NavbarBrand>
        {user && (
          <Nav navbar>
            <NavItem>
              <NavLink disabled>{`Manager: ${user.title}`}</NavLink>
            </NavItem>
            <Button color="light" onClick={handleLogout}>Logout</Button>
          </Nav>
        )}
      </div>
    </Navbar>
  );
};

export default HeaderCounter;
