import React, { JSXElementConstructor, useEffect, useState} from 'react';
import cl from './MyMenu.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {memo} from "react"
import { InboxSVG } from '../../utils/svg';
import { useUIContext } from '../../store/uiContext';

type MyMenuProps = {
   
    id: number;
    name: string;
    link: string;
    icon: React.ReactElement;

};

export const MyMenu= memo(({id, name, link, icon}: MyMenuProps) => {
    const navigate=useNavigate()
    const {pathname}=useLocation()
   
    const {width}=useUIContext()
    let wd=parseInt(width)

    const [isLocate, setIslocate]=useState<boolean>()
    
   
    const styleAt={ 
      borderRadius: "8px",
      background: "var(--Primary-100, #5570F1)",
      color:"white"
    }
    const Icon=()=>icon

    useEffect(()=>{ 
       setIslocate(()=>pathname.slice(0,link.length)===link)
    },[pathname])

    return (
      <div key={id}
          className={cl.my_menu_main}
          style={isLocate?styleAt:{width:"70%"}}
          onClick={()=>navigate(`${link}`)}
          >
         <Icon />
        {wd>180&&
          <li className={cl.menu_li}
              style={{
                fontSize:wd<247?"0.8rem":"1.2rem", 
                
              }}
              >
              {name}
          </li>
        }
      </div>
  );
}
)
