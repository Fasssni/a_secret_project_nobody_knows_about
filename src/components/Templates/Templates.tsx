import { useEffect, useState } from "react";
import {
  TemplatesType,
  connectedChannelsType,
  useStoreContext,
} from "../../store/api";
import cl from "./Templates.module.css";
type TemplateProps = {
  channels?: connectedChannelsType[];
};
export const Templates = ({ channels }: TemplateProps) => {
  const [templates, setTemplates] = useState<any[]>();
  const { getTemplates } = useStoreContext();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!channels) return;

      try {
        const templates = await Promise.all(
          channels.flatMap(async (el) => {
            const res = await getTemplates(el.id!);
            return res.map((template) => {
              return { ...template, bot_name: el.name };
            });
          })
        );
        setTemplates(templates);
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
      {templates?.map((item: TemplatesType) => {
        return <AutomationContainer {...item} />;
      })}
    </div>
  );
};

const AutomationContainer = (item: TemplatesType) => {
  return (
    <div className={cl.auto_container}>
      <div className={cl.auto_container_desc}>
        <p>
          When message equals to{" "}
          <span className={cl.auto_container_desc_essentials}>
            {item.triggersTo}
          </span>{" "}
          reply with{" "}
          <span className={cl.auto_container_desc_essentials}>{item.text}</span>
        </p>
      </div>
      <div className={cl.auto_container_edit}></div>
    </div>
  );
};
