import { ConversationProps } from "../../store/api"
import cl from "./ConvBox.module.css"
import styled from 'styled-components';
import { memo, useState, useEffect} from "react";


export const ConvBox=memo((item:ConversationProps)=>{ 
  
    console.log("Rerendered")

    const [randomColor, setRandomColor] = useState('');
    const [isSelected, setIsSelected]=useState<boolean>(false)

    useEffect(() => {
      // Generate a new random color on every render
      const randomColors = ['green', 'orange', 'red', 'blue', 'purple'];
      const newRandomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      setRandomColor(newRandomColor);
    }, []);


    return  <Container key={item.id}>
                <Avatar style={{backgroundColor:`${randomColor}`}}>
                    <p style={{color:"white",
                            textAlign:"center"}}>
                        {item.client_name[0]}
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
  border: 1px solid #ccc;
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