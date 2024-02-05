import { ConversationProps } from "../../store/api";
import cl from "./ConvBox.module.css";
import styled from "styled-components";
import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TelegramSvg } from "../../utils/svg";

type ConvBoxProps = {
  item: ConversationProps;
  getConversationInfo: (item: ConversationProps) => void;
  conv_id?: string;
};
export const ConvBox = memo(
  ({ item, getConversationInfo, conv_id }: ConvBoxProps) => {
    const [randomColor, setRandomColor] = useState("");
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const navigate = useNavigate();

    const onClickHandler = async () => {
      getConversationInfo(item);
      navigate(`/inbox/${item.id}`);
      setIsSelected(true);
    };

    const channelObj: Record<string, React.FC> = {
      telegram: () => TelegramSvg,
    };

    const TelegramIcon = channelObj[item!.channel.toLowerCase()];

    useEffect(() => {
      const randomColors = ["green", "orange", "red", "blue", "purple"];
      const newRandomColor =
        randomColors[Math.floor(Math.random() * randomColors.length)];
      setRandomColor(newRandomColor);
    }, []);

    useEffect(() => {
      if (parseInt(conv_id!, 10) === item.id) {
        getConversationInfo(item);
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }, [conv_id]);

    return (
      <Container onClick={() => onClickHandler()}>
        <Avatar
          style={{
            backgroundColor: item.user_pic ? "none" : `${randomColor}`,
            border: isSelected ? "2px solid blue" : "none",
          }}
        >
          {item.user_pic ? (
            <img src={item.user_pic} className={cl.user_pic}></img>
          ) : (
            <>
              <div className={cl.user_pic}>
                <p style={{ color: "white", textAlign: "center" }}>
                  {!item.user_pic && item.client_name[0]}
                </p>
              </div>
            </>
          )}
          <span className={cl.channel_icon}>
            <TelegramIcon />
          </span>
        </Avatar>
        <Content>
          <CustomerName>{item.client_name}</CustomerName>
        </Content>
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
`;

const CustomerName = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;
