import React, { useState, MouseEvent, useEffect } from 'react';
import cl from './BurgerMenu.module.css';
import { useUIContext } from '../../store/uiContext';
import Elements from '../../utils/menuels.json';
import { MyMenu } from '../MenuUI/MyMenu';

interface BurgerMenuProps {}

type MenuProps = {
  id: number;
  name: string;
  link: string;
  icon: string;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = () => {
  const { width, setWidth } = useUIContext();

  const handleResize = (event: MouseEvent<HTMLDivElement>) => {
    if (event.clientX <= 369) {
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
