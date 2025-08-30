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
             <div  className="h-[1000px] bg-[Amber]">
            <form  className="flex p-[2rem] gap-[2rem] justify-center"onSubmit={e =>{
                e.preventDefault();
                setParams({q:e.target.q.value,page:"1",type})
            }}>
                <input name="q" defaultValue={q} placeholder="Search Your Favourite..." type="search"/>
                <select value={type} onChange={e => setParams({q,page:"1",type:e.target.value})}>
                 <option value="movie">Movie</option>
                 <option value="series">Series</option>
                 <option value="episode">Episode</option>
                </select>
                <button>Search</button>
            </form>
            <div >
               {data.map(m => (
                <div key={m.imdbID} onClick={()=>navigate(`/movie/${m.imdbID}`)} style={{textAlign:"center",cursor:"pointer"}}>
                    <img src={m.Poster}/>
                    <p>{m.Title}({m.Year})</p>
                </div>
               ))}
            </div>
             {total >10 && (
                <div>
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