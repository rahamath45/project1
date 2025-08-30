 import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_KEY, REST_HOST_API } from "../backend";

  

   const Research= () =>{
          const navigate = useNavigate();
    const [params,setParams] = useSearchParams();
    const q = params.get("q") || "" ;
    const page = +params.get("page") || 1;
    const type = params.get("type") || "";
    const [data,setData] = useState([]);
    const [total,setTotal] = useState(0);
      
       useEffect(()=>{
        if(!q)return;
        fetch( `${REST_HOST_API}/${API_KEY}&s=${q}&page=${page}&type=${type}`,
            {method:"GET"})
            .then((response)=> response.json())
             .then((data)=>{
               console.log(data)
                setData(data.Search || []);
                setTotal(+data.totalResults || 0);
             })
          .catch((err)=> console.log(err));
    },[q,page,type]);


    return(
        <>
             <div  className="h-[1000px]  bg-linear-to-tl from-orange-900 to-[Red] inset-shadow-sm inset-shadow-orange-900/50 ">
            <form  className="flex p-[2rem] gap-[2rem] justify-center"onSubmit={e =>{
                e.preventDefault();
                setParams({q:e.target.q.value,page:"1",type})
            }}>
                <input className="w-[600px] p-1 rounded-md bg-[#fff] shadow-lg shadow-orange-900/90" name="q" defaultValue={q} placeholder="Search Your Favourite..." type="search"/>
                <select className="w-[150px] bg-[#fff] rounded-lg" value={type} onChange={e => setParams({q,page:"1",type:e.target.value})}>
                 <option value="movie">Movie</option>
                 <option value="series">Series</option>
                 <option value="episode">Episode</option>
                </select>
                <button className="p-2 w-[100px] bg-[#000] text-[#FF0000] rounded-md">Search</button>
            </form>
            <div className="grid grid-cols-6 m-6 gap-5 mt-[1rem] shadow-lg shadow-orange-900/90">
               {data.map(m => (
                <div key={m.imdbID} onClick={()=>navigate(`/movie/${m.imdbID}`)} style={{textAlign:"center",cursor:"pointer"}}>
                    <img  className="w-[220px] object-contain"src={m.Poster ? m.Poster : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}/>
                    <p>{m.Title}({m.Year})</p>
                </div>
               ))}
            </div>
             {total >10 && (
                <div className="mt-[1rem]">
                    <button disabled={page<=1} onClick={()=>setParams({q,type,page:page-1})}>Previous </button> 
                    <span> page{page} </span>
                    <button disabled={page>= Math.ceil(total/10)} onClick={()=>setParams({q,type,page:page+1})}>Next</button>
                </div>
             )}

           </div>
        </>
    )
  }


  export default Research;