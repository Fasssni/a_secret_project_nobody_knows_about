import { connectedChannelsType, useStoreContext } from "../../store/api";
import cl from "./ConnectChannels.module.css";
import { useState, useEffect } from "react";
import { ArrowSvg } from "../../utils/svg";

export const ConnectedChannels = () => {
  const { getChannels } = useStoreContext();
  const [channels, setChannels] = useState<connectedChannelsType[]>();
  const [modal, setModal] = useState<boolean>(false);
  const [channelModal, setChannelModal] = useState<boolean>(false);
  const [clickedChannel, setClickedChannel] = useState<connectedChannelsType>();

  const handleModalClose = () => {
    setChannelModal(() => false);
  };

  const handleModalOpen = (item: connectedChannelsType) => {
    setChannelModal(() => true);
    setClickedChannel(item);
  };

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

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  return (
    channels && (
      <div className={cl.con_channels_main}>
        <div className={cl.con_channels_top}>
          <h3>Connected channels</h3>
          <p>({channels?.length})</p>
          <div className={cl.arrow} onClick={() => setModal(!modal)}>
            <ArrowSvg />
          </div>
        </div>

        {modal && (
          <div className={cl.channel_list}>
            {channels?.map((item) => {
              return (
                <p
                  className={cl.channel}
                  key={item.id}
                  onClick={() => handleModalOpen(item)}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        )}
        {channelModal && (
          <ChannelDetails
            handleModalClose={handleModalClose}
            removeChannelState={removeChannelState}
            {...clickedChannel}
          />
        )}
      </div>
    )
  );
};

type channeDetailsType = {
  handleModalClose: () => void;
  removeChannelState: (id: number) => void;
} & connectedChannelsType;

const ChannelDetails = ({
  handleModalClose,
  removeChannelState,
  name,
  channel,
  id,
}: channeDetailsType) => {
  const { removeChannel } = useStoreContext();
  const [status, setStatus] = useState<string>();

  const deleteChannel = async () => {
    console.log(id);
    try {
      const res = await removeChannel(id!);
      if (res.status === 200) {
        setStatus("The channel has successfully been deleted");
        setTimeout(() => {
          handleModalClose();
        }, 3000);
        removeChannelState(id!);
      } else {
        setStatus(res.message);
        setTimeout(() => {
          handleModalClose();
        }, 3000);
      }
    } catch (e) {}
  };

  return (
    <div className={cl.channel_modal} onClick={() => handleModalClose()}>
      <div className={cl.channel_window} onClick={(e) => e.stopPropagation()}>
        {status ? (
          <p>{status}</p>
        ) : (
          <>
            <h3>Channel's Info:</h3>
            <p>id:{id}</p>
            <p>name:{name}</p>
            <p>channel:{channel}</p>
            <button onClick={deleteChannel}>Remove channel</button>
          </>
        )}
      </div>
    </div>
  );
};
