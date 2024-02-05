import { useEffect, useState } from "react";

import { useStoreContext } from "../../store/api";
import cl from "./Navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

import { MyAccountUI } from "../MyAccountUI/MyAccount";

export const Navbar = () => {
  // const navEls=[
  //     {   id:0,
  //         title:"CRM",
  //         link:'/'
  //     },
  //     {   id:1,
  //         title: "AI-agent",
  //         link:'/'
  //     },
  //     {   id:2,
  //         title:"Integrarions",
  //         link:"/integrate"
  //     },
  // ]

  const navigate = useNavigate();
  const location = useLocation();
  const lp = location.pathname;

  const { isAuth } = useStoreContext();

  const [windowDimensions, setDim] = useState({
    width: window.innerWidth,
  });
  const [isBurger, setIsBurger] = useState<boolean>(false);
  const [myAccountModal, setMyAccountModal] = useState<boolean>(false);

  const handleMyAccountModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setMyAccountModal((prev) => !prev);
  };

  const resizeHandler = () => {
    setDim({ ...windowDimensions, width: window.innerWidth });
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [windowDimensions, isBurger]);

  const { width } = windowDimensions;

  return (
    <nav
      className={cl.navbar_main}
      style={{ display: lp === "/login" || lp === "/signup" ? "none" : "flex" }}
      onClick={() => myAccountModal && setMyAccountModal(false)}
    >
      <h2 className={cl.logo} onClick={() => navigate("/")}>
        Quarter
      </h2>
      {isAuth ? (
        <MyAccountUI
          handleMyAccountModal={handleMyAccountModal}
          myAccountModal={myAccountModal}
        />
      ) : (
        <>
          {width <= 784 ? (
            <div className={cl.nav_burger_logo}>
              <a className={cl.burger_login} onClick={() => navigate("/login")}>
                Login
              </a>
              <svg
                onClick={() => setIsBurger(!isBurger)}
                width="3rem"
                height="3rem"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                  fill="#000000"
                />
              </svg>
            </div>
          ) : (
            <div className={cl.right_side}>
              {/* <ol className={cl.list_group}>
                               {navEls.map((el)=><li key={el.id}
                                                     onClick={()=>navigate(el.link)}
                                                     >
                                                     {el.title}
                                                 </li>)}
                            </ol> */}
              {/* <div className="buttons">
                                 <button className={cl.profile_icon}></button>
                                 <button className="btn_right" onClick={()=>logout()}>Log out</button>
                            </div> */}
              <div className="buttons">
                <button
                  className={cl.btn_left}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={cl.btn_right}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};
