import { useEffect, useState } from "react";
import {
  TemplatesType,
  connectedChannelsType,
  useStoreContext,
} from "../../store/api";

import cl from "./Templates.module.css";
import { Arrow } from "../ConnectedChannels/Arrow";
import { Adder } from "../UI/Adder";
import { TemplateBuilder } from "./TemplateBuilder";

type TemplateProps = {
  channels?: connectedChannelsType[];
};

export const Templates = ({ channels }: TemplateProps) => {
  const [templates, setTemplates] = useState<any[]>();
  const { getTemplates } = useStoreContext();

  const [show, setShow] = useState<boolean>(false);
  const [isBuilder, setIsBuilder] = useState<boolean>(false);

  const clickHandler = () => {
    setShow((prev) => !prev);
  };

  const builderOnOpen = () => {
    setIsBuilder(true);
  };

  const builderOnClose = () => {
    setIsBuilder(false);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!channels) return;

      try {
        const templates = await Promise.all(
          channels.map(async (el) => {
            const res = await getTemplates(el.id!);
            return res.map((template) => {
              return { ...template, bot_name: el.name };
            });
          })
        );
        setTemplates(templates.flat(1));
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [channels]);

  useEffect(() => {
    console.log(templates);
  }, [templates]);

  return (
    <div className={cl.templates_main}>
      <div className={cl.templates_wrapper}>
        <div className={cl.templates_header}>
          <h3>Automations</h3>
          <p>({templates?.length})</p>
          <Arrow handleClick={clickHandler} modal={show} />
        </div>
        <Adder onClick={builderOnOpen}>Add</Adder>
      </div>

      {show && (
        <>
          {templates?.map((item: TemplatesType) => {
            return <AutomationContainer {...item} />;
          })}
        </>
      )}
      {isBuilder && (
        <TemplateBuilder builderOnClose={builderOnClose} channels={channels} />
      )}
    </div>
  );
};

const AutomationContainer = (item: TemplatesType) => {
  return (
    <div className={cl.auto_container}>
      <div className={cl.auto_channel}>
        <p>{item.bot_name}</p>
      </div>
      <div className={cl.auto_container_main}>
        <div className={cl.auto_container_desc}>
          <p>
            When message equals to{" "}
            <span className={cl.auto_container_desc_essentials}>
              {item.triggersTo}
            </span>{" "}
            reply with{" "}
            <span className={cl.auto_container_desc_essentials}>
              {item.text}
            </span>
          </p>
        </div>
        <div className={cl.auto_container_edit}>
          <p>edit</p>
        </div>
      </div>
    </div>
  );
};
