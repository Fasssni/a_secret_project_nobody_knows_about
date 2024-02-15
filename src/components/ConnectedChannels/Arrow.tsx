import { ArrowSvg } from "../../utils/svg";
import cl from "./ConnectChannels.module.css";

type ArrowProps = {
  modal: boolean;
  handleClick: () => void;
};

export const Arrow = ({ ...children }: ArrowProps) => {
  return (
    <div
      className={`${cl.arrow} ${children.modal && cl.rotate}`}
      onClick={() => children.handleClick()}
    >
      <ArrowSvg />
    </div>
  );
};
