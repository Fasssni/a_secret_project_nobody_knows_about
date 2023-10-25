import {createContext, useContext,useState, Dispatch} from "react"

type uiContextProps={ 
   width:string,
   setWidth: Dispatch<React.SetStateAction<string>>
}
type ChildrenType={ 
    children:React.ReactNode
}
const uiContext=createContext({} as uiContextProps)
export const useUIContext=()=>useContext(uiContext)

export const UiContextProvider=({children}:ChildrenType)=>{ 
    const [width, setWidth] = useState<string>(()=>{ 
        const storedWidth=localStorage.getItem("barWidth")
        return storedWidth||"20%"
   }); // Initial width


   return <uiContext.Provider value={{
                                width, 
                                setWidth
                              }}
                              > 
                         {children}
          </uiContext.Provider>
}