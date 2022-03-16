
import { TextField, Typography,Stack, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import bot from './bot.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function ChatWindow(){

    let backColor="#5CDB95";
    let textColor="#05386B"; 
    let messageColor="#EDF5E1"
    let dynamicWidth="100%"
   const mediaQueryFlag = useMediaQuery('(min-width:600px)');
   if(mediaQueryFlag){
        dynamicWidth="70%";
   }


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
            <Stack  sx={{ paddingTop:'10px',  alignItems:"center", height:"100vh", backgroundColor:backColor, color:textColor, display:'flex',paddingX:'20px'}}>
            {/* Header*/}
            <Stack sx={{width:dynamicWidth, alignItems:'center',  borderBottom:1 }} direction='row'  justifyContent="flex-end" >
                {/* Bot Name */}
                <Typography variant='h5'>inFeeBot</Typography>
                {/* Bot Logo */}
                <Box component='img' src={bot}
                sx={{
                    width:'40px',
                    height:'40px', 
                    marginLeft:'10px'
                }}>
                </Box>
            </Stack>
            {/* Message Window */}
            <Stack id="messageWindow" sx={{overflowY:'auto', width:dynamicWidth, height:"80vh", scrollbarWidth:"none", overflowX:"hidden", marginY:'5px'}} >
                {   
                   messages.length!==0 &&  messages.map((x,index)=>{
                    return  <Typography  sx={{backgroundColor:messageColor,overflowWrap:'break-word', maxWidth:"70%",paddingX:'5px', border:'1px solid skyblue', borderRadius:'10px', marginY:'10px' }} alignSelf={x.source==="user"?'flex-end' : 'flex-start'} key={x.source+x.text+index} alt="chatmsg" variant='h6'>{x.text}</Typography>
                  })
                }
            </Stack>
            {/* Message Input and  Button */}
            <Stack sx={{width:dynamicWidth ,alignItems:'center' }} direction='row' onSubmit={handleSend}  component='form' >
                <TextField placeholder="Type Something..." sx={{width:"100%",margin:'0px'}} onChange={handleChange} value={message} name='user_text' size='small' autoComplete="off" focused={true}></TextField>
                <InputAdornment position="end">
                    <SendRoundedIcon fontSize="large" onClick={handleSend}/>
                </InputAdornment>
            </Stack>
        </Stack>
    )

}

