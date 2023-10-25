import React from 'react';
import cl from './MyMenu.module.css';
import { useNavigate } from 'react-router-dom';

type MyMenuProps = {
   
    id: number;
    name: string;
    link: string;
    icon: string;

};

export const MyMenu = ({id, name, link, icon}: MyMenuProps) => {
    const navigate=useNavigate()
  return (
    <div key={id}
         className={cl.my_menu_main}
         >
         <li className={cl.menu_li}
             onClick={()=>navigate(`${link}`)}
             >
             {name}
             </li>
    </div>
  );
};
