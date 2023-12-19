import React, { useState, MouseEvent, useEffect } from 'react';
import cl from './BurgerMenu.module.css';
import { useUIContext } from '../../store/uiContext';
import  {menuels as Elements} from '../../utils/menuels.tsx';
import { MyMenu } from '../MenuUI/MyMenu';


export const BurgerMenu: React.FC<BurgerMenuProps> = () => {
  const { width, setWidth } = useUIContext();

  const handleResize = (event: MouseEvent<HTMLDivElement>) => {
    if (event.clientX <= 270&&event.clientX>=55) {
      setWidth(`${event.clientX}px`);
    }
  };

  const startResize = () => {
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);
  };

  const stopResize = () => {
    window.removeEventListener('mousemove', handleResize);
    window.removeEventListener('mouseup', stopResize);
  };

  useEffect(() => {
    return () => localStorage.setItem('barWidth', width);
  }, [width]);

  return (
    <div
      className={cl.burgermenu_main}
      style={{ width: typeof width === 'string' ? width : '20%' }}
      onMouseDown={startResize}
    >
      
        <ol className={cl.menu_ol}>
          {Elements.map((el) => (
            <MyMenu key={el.id} {...el} />
          ))}
        </ol>
     
      <div className={cl.resizeHandle}></div>
    </div>
  );
};
