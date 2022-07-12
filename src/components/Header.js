import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
function Header() {
  const loginuser = useSelector((state) => state.loginuser);
  const { userInfo } = loginuser;

  const dispatch = useDispatch();

  const handlelogout = (e) => {
    dispatch(logout());
  };
  return (
    <header className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TexStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/cart"
                >
                  <i className="fa-solid fa-cart-arrow-down"></i>Cart
                </Link>
              </li>

              {userInfo ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                   
                    <li>
                      {" "}
                      <button className="dropdown-item" onClick={handlelogout}>
                        logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-user"></i>Login
                  </Link>
                </li>
              )}

               {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   Admin
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    
                    <li>
                      <Link className="dropdown-item" to="/admin/userlists">
                        Users
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/admin/products">
                        products
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/admin/orderslist">
                       orders
                      </Link>
                    </li>
                   
                  </ul>
                </li>
              ) }  
            </ul>
            <Search />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
