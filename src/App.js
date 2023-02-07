import React from "react";
import "./App.css";
import "./Admin.css";
import { Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import HeaderUser from "./components/HeaderUser/HeaderUser";
import HomeDetail from "./components/HomeDetail/HomeDetail";
import CartDetail from "./components/CartDetail/CartDetail";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import BuyDetail from "./components/BuyDetail/BuyDetail";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";

import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import ProfilePage from "./components/Profile/Profile";
import OrderPage from "./components/Order/Order";

import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserCenter from "./components/UserCenter/UserCenter";
import SellerCenter from "./components/SellerCenter/SellerCenter";
import Posts from "./components/Posts/Posts";

import SellerRegister from "./components/SellerRegister/SellerRegister";
import SellerOrderPage from "./components/SellerOrderPage/SellerOrderPage";
import SellerPage from "./components/SellerPage/SellerPage";
import AddItem from "./components/AddItem/AddItem";
import SellerProfilePage from "./components/SellerProfilePage/SellerProfilePage";
import EditSellerItem from "./components/EditSellerItem/EditSellerItem";
import SellerStoreProfilePage from "./components/SellerStoreProfilePage/SellerStoreProfilePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const STATUS = {
    BAN: -1,
    NORMAL: 1,
    ANONYOUS: 0,
};

const TYPE = {
    NORMAL_USER: 0,
    ADMIN: 1,
    SELLER: -1,
};

export default class App extends React.Component {
    state = {
        user_account: {
            _id: "",
            usn: "",
            psw: "",
            status: STATUS.ANONYOUS,
            type: TYPE.NORMAL_USER,
        },
        keySearch: '',
    };
    callbackSetKeySearch = (k) => {
        this.setState((prevState) => ({...prevState, keySearch: k }));
    };
    setUserAccount = (id, usn, psw, status, type) => {
        if (status === STATUS.NORMAL) {
            this.setState({ user_account: { id, usn, psw, status, type } });
        } else if (status === STATUS.BAN) {
            // Handle
        }
    };
    removeUserAccount = () => {
        this.setState({
            user_account: {
                usn: "",
                psw: "",
                status: STATUS.ANONYOUS,
                type: TYPE.NORMAL_USER,
            },
        });
    };

    render() {        
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="bg-eee">
                        <Routes>
                            <Route
                                path={"/"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <HomeDetail />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <HomeDetail />
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/cartdetail/:id"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <CartDetail />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <CartDetail />
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/item/:slug"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <ItemDetail />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <ItemDetail />
                                            <Footer />
                                        </>
                                    )
                                }
                            />

                            <Route
                                path={"/buy"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <BuyDetail />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <BuyDetail />
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/products"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <Products />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <Products />
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/me"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <ProfilePage userAccount={this.state.user_account} />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <h3>not log in or banned</h3>
                                            {/* <ProfilePage /> */}
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/orders"}
                                element={
                                    this.state.user_account.status === STATUS.NORMAL ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <OrderPage userAccount={this.state.user_account} />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <Header />
                                            <h3>not log in or banned</h3>
                                            {/* <ProfilePage /> */}
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path={"/login"}
                                element={<LoginPage setAccount={this.setUserAccount} />}
                            />
                            <Route path={"/register"} element={<RegisterPage />} />

                            {/*{
                                isSeller === true ? (
                                    <Routes>
                                        
                                    </Routes>
                                                    
                                ) : (
                                    <LoginPage/>
                                )
                            }
                            */}
                            <Route
                                path="/seller-register"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type !== TYPE.SELLER ? (
                                        <SellerRegister setAccount={this.setUserAccount} />
                                    ) : (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <SellerPage />
                                            <Footer />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path="/seller"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <SellerPage />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage setAccount={this.setUserAccount} />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path="/seller/add"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <AddItem />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage setAccount={this.setUserAccount} />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path="/seller/orders"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <SellerOrderPage />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage setAccount={this.setUserAccount} />
                                        </>
                                    )
                                }
                            />

                            <Route
                                path="/seller/item/edit/:slug"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <EditSellerItem />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage setAccount={this.setUserAccount} />
                                        </>
                                    )
                                }
                            />
                            <Route
                                path="/seller/profile"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL &&
                                        this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser
                                                logoutMethod={this.removeUserAccount}
                                                userAccount={this.state.user_account}
                                            />
                                            <SellerProfilePage />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage setAccount={this.setUserAccount} />
                                        </>
                                    )
                                }
                            />
                            
                            <Route
                                path="/seller/storeprofile"
                                element={
                                    this.state.user_account.status === STATUS.NORMAL && this.state.user_account.type === TYPE.SELLER ? (
                                        <>
                                            <HeaderUser logoutMethod={this.removeUserAccount} userAccount={this.state.user_account} />
                                            <SellerStoreProfilePage />
                                            <Footer />
                                        </>
                                    ) : (
                                        <>
                                            <LoginPage
                                                setAccount={this.setUserAccount}
                                            />
                                        </>
                                    )

                                }

                            />

                            <Route
                                path={"/admin/dashboard"}
                                element={
                                    this.state.user_account.type === TYPE.ADMIN ? (<><AdminNavbar /><AdminDashboard /></>) : (
                                        <Navigate to="/login" setAccount={this.setUserAccount} replace={true} />
                                    )
                                }
                            />
                            <Route
                                path={"/admin/usercenter"}
                                element={
                                    this.state.user_account.type === TYPE.ADMIN ? (<><AdminNavbar /><UserCenter /></>) : (
                                        <Navigate to="/login" setAccount={this.setUserAccount} replace={true} />
                                    )
                                }
                            />
                            <Route
                                path={"/admin/sellercenter"}
                                element={
                                    this.state.user_account.type === TYPE.ADMIN ? (<><AdminNavbar /><SellerCenter /></>) : (
                                        <Navigate to="/login" setAccount={this.setUserAccount} replace={true} />
                                    )
                                }
                            />
                            <Route
                                path={"/admin/posts"}
                                element={
                                    this.state.user_account.type === TYPE.ADMIN ? (<><AdminNavbar /><Posts /></>) : (
                                        <Navigate to="/login" setAccount={this.setUserAccount} replace={true} />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
