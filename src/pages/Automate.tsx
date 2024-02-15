import { useEffect, useState } from "react";
import { ConnectedChannels } from "../components/ConnectedChannels/ConnectedChannels";
import { Templates } from "../components/Templates/Templates";
import styles from "../pageModules/Automate.module.css";
import { connectedChannelsType, useStoreContext } from "../store/api";

export const Automate = () => {
  const [channels, setChannels] = useState<connectedChannelsType[]>();

  const { getChannels } = useStoreContext();

  const removeChannelState = (id: number) => {
    setChannels((prevChannels) =>
      prevChannels?.filter((channel) => channel.id !== id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChannels();
      setChannels(res);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.automate_main}>
      <ConnectedChannels
        channels={channels}
        removeChannelState={removeChannelState}
      />
      <Templates channels={channels} />
    </div>
  );
};
