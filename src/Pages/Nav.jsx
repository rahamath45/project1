import { useNavigate } from "react-router-dom";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DehazeIcon from '@mui/icons-material/Dehaze';
  
  const Nav = () =>{
     const navigate = useNavigate();
    return(
          <nav className=" flex-row flex bg-[url(./assest/images.jpg)] h-40 text-[Red]  p-10 justify-between">
             <div className="flex flex-row gap-4">  <LiveTvIcon></LiveTvIcon>
                   <div onClick={()=>navigate("/")} className="text-[30px] relative bottom-2 cursor-pointer " >OMDb Movie
                   </div>
             </div> 
             <div className="flex flex-row gap-6 pt-1">
                  <NotificationsIcon></NotificationsIcon>
                  <DehazeIcon></DehazeIcon>
             </div>
          </nav>
    )
  }
  export default Nav;

