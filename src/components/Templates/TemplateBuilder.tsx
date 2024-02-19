import { useState } from "react";
import { TemplateBodyType, connectedChannelsType } from "../../store/api";
import cl from "./Templates.module.css";

type BuilderProps = {
  builderOnClose: () => void;
  channels?: connectedChannelsType[];
};

export const TemplateBuilder = ({ builderOnClose, channels }: BuilderProps) => {
  const [data, setData] = useState<TemplateBodyType>({
    bot_id: 0,
    name: "",
    triggersTo: "",
    text: "",
  });

  return (
    <div className={cl.builder_main} onClick={builderOnClose}>
      <div
        className={cl.builder_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cl.channel_info}>
          <h3>When in</h3>
          <select className={cl.select_box}>
            {channels?.map((channel) => {
              return <option>{channel.name}</option>;
            })}
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <h3>Message equals to</h3>
          <input />
          <h3>reply with</h3>
          <input></input>
        </div>
      </div>
    </div>
  );
};
