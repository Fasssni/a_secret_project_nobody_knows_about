import React, { useEffect, useState } from "react";
import cl from "./MyMenu.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { memo } from "react";

import { useUIContext } from "../../store/uiContext";

type MyMenuProps = {
  id: number;
  name: string;
  link: string;
  icon: React.ReactElement;
  isMobile: boolean;
};

export const MyMenu = memo(
  ({ id, name, link, icon, isMobile }: MyMenuProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { width } = useUIContext();

    const [isLocate, setIslocate] = useState<boolean>();

    const styleAt = {
      borderRadius: "8px",
      background: "var(--Primary-100, #5570F1)",
      color: "white",
    };
    const Icon = () => icon;

    useEffect(() => {
      setIslocate(() => pathname.slice(0, link.length) === link);
    }, [pathname]);

    return (
      <>
        {isMobile ? (
          <div
            className={cl.my_menu_mob}
            onClick={() => navigate(`${link}`)}
            style={isLocate ? styleAt : {}}
          >
            <Icon />
          </div>
        ) : (
          <div
            key={id}
            className={cl.my_menu_main}
            style={isLocate ? styleAt : { width: "70%" }}
            onClick={() => navigate(`${link}`)}
          >
            <Icon />
            {parseInt(width) > 180 && (
              <li
                className={cl.menu_li}
                style={{
                  fontSize: "0.8rem",
                }}
              >
                {name}
              </li>
            )}
          </div>
        )}
      </>
    );
  }
);
