import { createContext, useContext, useState, Dispatch } from "react";

type uiContextProps = {
  width: string;
  setWidth: Dispatch<React.SetStateAction<string>>;
  chatModal: boolean;
  handleChatModal: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  closeChatModal: () => void;
};
type ChildrenType = {
  children: React.ReactNode;
};
const uiContext = createContext({} as uiContextProps);
export const useUIContext = () => useContext(uiContext);

export const UiContextProvider = ({ children }: ChildrenType) => {
  const [width, setWidth] = useState<string>(() => {
    const storedWidth = localStorage.getItem("barWidth");
    return storedWidth || "25%";
  }); // Initial width
  const [chatModal, setChatModal] = useState<boolean>(false);

  const handleChatModal = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setChatModal((prev) => !prev);
  };
  const closeChatModal = () => {
    setChatModal(() => false);
  };
  return (
    <uiContext.Provider
      value={{
        width,
        setWidth,
        chatModal,
        handleChatModal,
        closeChatModal,
      }}
    >
      {children}
    </uiContext.Provider>
  );
};
