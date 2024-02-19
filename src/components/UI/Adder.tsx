import cl from "./UI.module.css";

export const Adder = ({ children, onClick }: any) => {
  return (
    <button className={cl.adder_main} onClick={onClick}>
      {children}
    </button>
  );
};
