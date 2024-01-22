import { ConversationProps, useStoreContext } from "../../store/api"
import cl from "./ConvBox.module.css"
import styled from 'styled-components';
import { memo, useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { TelegramSvg } from "../../utils/svg";


type ConvBoxProps={ 
      item:ConversationProps, 
      getConversationInfo:(item:ConversationProps)=>void
}
export const ConvBox=memo(({item,getConversationInfo}:ConvBoxProps)=>{ 
  
    const [randomColor, setRandomColor] = useState('');
    const {conv_id}=useParams()
    

    const navigate=useNavigate()

    const onClickHandler= async ()=>{ 
        // await getUserChat(item.id, item.user_id)
        getConversationInfo(item)
        navigate(`/inbox/${item.id}`)
    }

    const channelObj:Record<string, React.FC>={ 
       telegram:()=>TelegramSvg,
    }

    const TelegramIcon=channelObj[item!.channel.toLowerCase()]
       
    

    useEffect(() => {
      // Generate a new random color on every render
      const randomColors = ['green', 'orange', 'red', 'blue', 'purple'];
      const newRandomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      setRandomColor(newRandomColor);

    }, []);

    
  useEffect(()=>{ 
    if(parseInt(conv_id!,10)===item.id){
      getConversationInfo(item)
    }
},[])

    
  

    return  <Container onClick={ ()=>  onClickHandler()}>
                <Avatar style={{backgroundColor:item.user_pic?"none":`${randomColor}`}}
                >
                    {item.user_pic?
                                  <img src={item.user_pic}
                                       className={cl.user_pic}
                                  >
                                  </img>
                    :
                    <>
                    <div className={cl.user_pic}>
                      <p style={{color:"white",
                              textAlign:"center"}}>
                          {!item.user_pic&&item.client_name[0]}
                      </p>
                    </div>
                    </>}
                    <span className={cl.channel_icon}>
                        <TelegramIcon/>
                    </span>
                  </Avatar>
                <Content>
                <CustomerName>{item.client_name}</CustomerName>
                </Content>
             </Container>

})




const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor:pointer;
  
  
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content:center;
  position:relative;
  
`;

const Content = styled.div`
  flex: 1;
`;

const CustomerName = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;