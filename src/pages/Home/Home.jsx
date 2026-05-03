import { useEffect, useState } from "react";
import { supabase } from "./createSoup";
import "./Home.css";



function Home() {
  const [items, setItems]=useState([])
  console.log(items)

  useEffect(()=>{
    fetchItems()
  },[])

  async function fetchItems() {
    const {data} =await supabase
    .from('items')
    .select('*')
    setItems(data)
  }

function Car(myobj) {
  return (
    <div>
      <p>{myobj.color} </p>
      <p>{myobj.name} </p> 
      <p>{myobj.location}</p>
    </div>
  );
}
  return( 
    <div className="item">
      {items.map((item)=>
        <Car name={item.name} location={item.location} color={item.colour} />
      )}
    </div>
    

  );
}

export default Home;