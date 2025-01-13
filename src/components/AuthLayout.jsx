import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
    children,// Component fixed name in react[In React, children is a special prop that represents the content between the opening and closing tags of a component.]
    authentication = true,
}){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state=>state.auth.status)
    
    useEffect(()=>{
        
        if(authentication && authStatus!==authentication){
            navigate("/login");
        }else if(!authentication && authStatus!==authentication){
            navigate("/");
        } 
        setLoader(false);

    }, [authStatus, navigate, authentication])

    return loader?<h1>Loading...</h1>:<>{children}</>
}