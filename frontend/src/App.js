import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const [rightbarIsOpen, setRightbarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    setRightbarIsOpen(false);
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="navbar">
          <div>
            <Link className="brand" to="/">
              Ecommerce
            </Link>
          </div>
          <div className='right-search'>
            <SearchBox />
          </div>
          <div className='right-open'>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {categories && (
              <div className="dropdown">
                <Link to="#">
                  Categories<i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                {(
                categories.map((c) => (
                  <li key={c}>
                    <Link to={`/search/category/${c}`}>
                      {c}
                    </Link>
                  </li>
                  ))
            )}
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
          <div className='rightbar'>
            <button
              type="button"
              className="open-rightbar"
              onClick={() => setRightbarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
        </header>
        <aside className={rightbarIsOpen ? 'right' : ''}>
          <ul className="categories">
            <li className='close-rightbar'>
              <button
                onClick={() => setRightbarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            <li className='right-open-search'>
              <SearchBox />
            </li>
            <li>
              <Link to="/cart"  style={{ textDecoration: 'none' ,color:'black',fontWeight:'bold'}} onClick={() => setRightbarIsOpen(false)}>
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </li>
            
            <li>
            {categories && (
              <div className="dropdown">
                <Link to="#"  style={{ textDecoration: 'none' ,color:'black',fontWeight:'bold'}}>
                  Categories<i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content-disp">
                {(
                categories.map((c) => (
                  <li key={c}>
                    <Link  style={{ textDecoration: 'none' ,color:'black'}} onClick={() => setRightbarIsOpen(false)} to={`/search/category/${c}`}>
                      {c}
                    </Link>
                  </li>
                  ))
            )}
                </ul>
              </div>
            )}
            </li>
            <li>
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin"  style={{ textDecoration: 'none' ,color:'black',fontWeight:'bold'}}>
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content-disp">
                  <li>
                    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/dashboard" onClick={() => setRightbarIsOpen(false)}>Dashboard</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/productlist" onClick={() => setRightbarIsOpen(false)}>Products</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/orderlist" onClick={() => setRightbarIsOpen(false)}>Orders</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/userlist" onClick={() => setRightbarIsOpen(false)}>Users</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: 'none' ,color:'black'}} to="/support" onClick={() => setRightbarIsOpen(false)}>Support</Link>
                  </li>
                </ul>
              </div>
            )}
            </li>
            <li>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#"  style={{ textDecoration: 'none' ,color:'black',fontWeight:'bold'}}>
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content-disp">
                  <li>
                    <Link to="/profile" onClick={() => setRightbarIsOpen(false)} style={{ textDecoration: 'none' ,color:'black'}}>User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory" onClick={() => setRightbarIsOpen(false)} style={{ textDecoration: 'none' ,color:'black'}}>Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" style={{ textDecoration: 'none' ,color:'black'}} onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" style={{ textDecoration: 'none' ,color:'black'}} onClick={() => setRightbarIsOpen(false)}>Sign In</Link>
            )}
            </li>
          </ul>
        </aside>
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={<ProductEditScreen/>}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/support"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />

            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved@ Ecommerce.com</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
