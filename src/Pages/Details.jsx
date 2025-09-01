import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY, REST_HOST_API } from "../backend";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Rating } from "@mui/material";
 


 const Details = () =>{
      const {id} = useParams();
   const [m,setM] = useState(null);
   const [value,setValue] = useState("0")

    useEffect(()=>{
    fetch( `${REST_HOST_API}/${API_KEY}&i=${id}&plot=full`,
                {method:"GET"})
                .then((response)=> response.json())
                 .then((data)=>{
                        setM(data)
                 })
              .catch((err)=> console.log(err));
   },[id]);

       if(!m) return <h3 style={{textAlign:"center"}}>Loading.......</h3>
    
    return(
        <>
        <div className="flex justify-center  bg-[#000] sm:flex sm:justify-center  sm:gap-[2rem]">
          <div className="bg-[Red] lg:p-[1rem] lg:flex lg:flex-row inset-shadow-sm inset-shadow-indigo-500  gap-[1.5rem] lg:h-[900px] lg:w-[1200px] justify-center sm:flex sm:gap-4 w-[600px] md:flex md:flex-col" >
              <KeyboardBackspaceIcon></KeyboardBackspaceIcon> 
               <Link to="/" className="relative bottom-2 right-[20px] font-bolder text-[22px]"> Back</Link>
          <div className="  ml-20 lg:w-[440px] lg:h-[400px] text-center lg:mt-[10px] ">
             <h1 className="lg:text-[30px]  ">{m.Title}</h1>
          <img className="  lg:w-[400px] lg:h-[500px] m-5 mt-10"
           src={m.Poster == "N/A" ?  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCBHgbS23kyBw2r8Pquu19UtKZnrZmFUx1g&s" : m.Poster }/></div>
         <div className="w-[600px] h-[600px] text-center flex flex-col mt-[190px] "> 
              <p className="lg:text-[20px]"><b>Year :</b>{m.Year}</p>
               <p className="lg:text-[20px]"><b>Runtime :</b>{m.Runtime}</p>
                <p className="lg:text-[20px]"><b>Genre :</b>{m.Genre}</p>
                  <p className="lg:text-[20px]"><b>Language :</b>{m.Language}</p>
           <p className="lg:text-[20px] ">{m.Plot}</p>
           <p className="lg:text-[20px] "><b>Actors :</b>{m.Actors}</p>
           <p className="lg:text-[20px]"><b>Rating :</b>{m.imdbRating}</p>
           <div className="flex flex-col items-center space-y-2 p-4">
            <p className="">(its your rating time)</p>
              <Rating
              name="movie-rating" value={value}
              onChange={(event,newValue)=> {setValue(newValue)}}
              />
              <p className="text-lg font-medium">Your rating: {value}</p>
           </div>

           </div>
          </div>
            
         </div>
        
        </>
    )
  }


  export default Details;