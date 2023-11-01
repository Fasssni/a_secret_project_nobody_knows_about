import { ConversationProps, useStoreContext } from "../../store/api"
import cl from "./ConvBox.module.css"
import styled from 'styled-components';
import { memo, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";



export const ConvBox=memo((item:ConversationProps)=>{ 
  
    console.log("Rerendered")
    const {getUserChat}=useStoreContext()
   
    const [randomColor, setRandomColor] = useState('');
    

    const navigate=useNavigate()

    const onClickHandler= async ()=>{ 
        // await getUserChat(item.id, item.user_id)
        navigate(`/inbox/${item.id}`)
    }

    useEffect(() => {
      // Generate a new random color on every render
      const randomColors = ['green', 'orange', 'red', 'blue', 'purple'];
      const newRandomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      setRandomColor(newRandomColor);
    }, []);
    
  

    return  <Container onClick={ ()=>  onClickHandler()}>
                <Avatar style={{backgroundColor:item.user_pic?"none":`${randomColor}`}}
                >
                    {item.user_pic&&
                                  <img src={item.user_pic}
                                       className={cl.user_pic}
                                  >
                                  </img>}
                    <p style={{color:"white",
                            textAlign:"center"}}>
                        {!item.user_pic&&item.client_name[0]}
                    </p></Avatar>
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
  
`;

const Content = styled.div`
  flex: 1;
`;

const CustomerName = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;