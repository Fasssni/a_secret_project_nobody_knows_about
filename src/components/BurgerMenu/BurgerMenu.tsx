import { useEffect, useState } from "react";
import cl from "./BurgerMenu.module.css";
import { useUIContext } from "../../store/uiContext";
import { menuels as Elements } from "../../utils/menuels.tsx";
import { MyMenu } from "../MenuUI/MyMenu";

export const BurgerMenu = () => {
  const { width, setWidth } = useUIContext();

  const handleResize = (event: globalThis.MouseEvent) => {
    if (event.clientX <= 270 && event.clientX >= 55) {
      setWidth(`${event.clientX}px`);
    }
  };

  const startResize = () => {
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
  };

  const stopResize = () => {
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
  };

  const [isAdapt, setIsAdapt] = useState<boolean>();

  useEffect(() => {
    if (!isAdapt) return () => localStorage.setItem("barWidth", width);
  }, [width]);

  useEffect(() => {
    const handleWidthSize = () => {
      setIsAdapt(() => {
        const x = window.innerWidth < 1000;

        if (x) {
          setWidth(() => "0px");
        } else {
          const val = localStorage.getItem("barWidth");
          setWidth(() => `${val}`);
        }
        return x;
      });
    };
    handleWidthSize();

    window.addEventListener("resize", handleWidthSize);

    return () => window.removeEventListener("resize", handleWidthSize);
  }, []);

  console.log(parseInt("25%"));
  return (
    <>
      {isAdapt ? (
        <MobileBurger />
      ) : (
        <div
          className={cl.burgermenu_main}
          style={{ width: typeof width === "string" ? width : "195px" }}
          onMouseDown={startResize}
        >
          <ol className={cl.menu_ol}>
            {Elements.map((el) => (
              <MyMenu key={el.id} {...el} isMobile={false} />
            ))}
          </ol>

          <div className={cl.resizeHandle}></div>
        </div>
      )}
    </>
  );
};

const MobileBurger = () => {
  return (
    <div className={cl.burgermenu_main_mob}>
      <ol className={cl.menu_ol_mob}>
        {Elements.map((el) => (
          <MyMenu key={el.id} {...el} isMobile={true} />
        ))}
      </ol>
    </div>
  );
};
