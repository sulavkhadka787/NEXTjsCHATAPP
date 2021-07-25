import { useEffect } from "react";

const Index=({user,userFollowStats})=>{
   
    useEffect(()=>{
        document.title=`Welcome ${user.name.split(' ')[0]}`
    },[]);

    return(
        <>
            homepage
        </>
    )
}

export default Index;