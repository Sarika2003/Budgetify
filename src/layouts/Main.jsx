import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData  } from "../helpers/helpers";
import wave from "../assets/wave.svg"
import Navbar from "../components/Navbar"


//loader function
export function mainLoader(){
    const userName = fetchData("userName");
    return {userName};
}

const Main = () => {

  const {userName} = useLoaderData();  
  return (
    <div className="layout ">
      <Navbar userName={userName} />
     <main>
      <Outlet/>
      </main>
      <img src={wave} alt="wave image" />
    </div>
   
  )
}

export default Main
