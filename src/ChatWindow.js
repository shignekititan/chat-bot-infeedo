
import { TextField, Typography,Stack, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import bot from './bot.png'
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function ChatWindow(){

    var backColor="#5CDB95";
    var textColor="#05386B"; 
    var messageColor="#EDF5E1"

   const [message, setMessage]=useState("");
   const [messages,setMessageValues]=useState(JSON.parse(localStorage.getItem('messageData')||"[]"));
   //Handle Message Value Change
   const handleChange = (event)=>{
       setMessage(event.target.value);
   }
   //Handle Send Button Action on Form
    const handleSend = (event)=>{
        event.preventDefault();
        if(message.trim()!==""){
            setMessageValues([...messages,{"source":'user',"text":message}])
            setMessage("");
            setMessageValues(prevState=>[...prevState,{"source":'bot',"text":prevState[prevState.length-1].text}])
        }
    }

    useEffect(()=>{
        let elem=document.getElementById("messageWindow");
        elem.scrollTop=elem.scrollHeight;
        localStorage.setItem("messageData",JSON.stringify(messages));
    })

    return(
        //Main Container 
            <Stack  sx={{ alignItems:"center", height:"100vh", backgroundColor:backColor, color:textColor, justifyContent:"center", display:'flex',paddingX:'20px'}}>
            {/* Header*/}
            <Stack direction='row' width="100%" alignItems='center' justifyContent="flex-end"  borderBottom={1} >
                {/* Bot Name */}
                <Typography variant='h6'>inFeeBot</Typography>
                {/* Bot Logo */}
                <Box component='img' src={bot}
                sx={{
                    width:'60px',
                    height:'60px', 
                    marginLeft:'10px'
                }}>
                </Box>
            </Stack>
            {/* Message Window */}
            <Stack id="messageWindow" sx={{overflowY:'auto', width:"100%", height:"70vh", scrollbarWidth:"none", overflowX:"hidden", marginY:'5px'}} >
                {   
                   messages.length!==0 &&  messages.map((x)=>{
                    return  <Typography  sx={{backgroundColor:messageColor,overflowWrap:'break-word', maxWidth:"70%",paddingX:'5px', border:'1px solid skyblue', borderRadius:'10px', marginY:'10px' }} alignSelf={x.source==="user"?'flex-end' : 'flex-start'} key={x.source+x.text} variant='h6'>{x.text}</Typography>
                  })
                }
            </Stack>
            {/* Message Input and  Button */}
            <Stack width='100%' component='form' alignItems={'center'} direction='row' onSubmit={handleSend} >
                <TextField placeholder="Type Something..." sx={{width:'100%',margin:'0px'}}onChange={handleChange} value={message} name='user_text' size='small' autoComplete="off"></TextField>
                <InputAdornment position="end">
                    <SendRoundedIcon fontSize="large" onClick={handleSend}/>
                </InputAdornment>
            </Stack>
        </Stack>
    )

}

