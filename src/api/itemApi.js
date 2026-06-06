// export const getItems = async () => {
//     const response = await fetch("http://localhost:5000/items"); // example endpoint
//     return response.json();
// };

// src/api/itemApi.js
import { supabase } from "../data/supabase";

// Fetch item by item_id
export async function fetchItemById(itemId) {
  if (!itemId) throw new Error("Missing itemId");

  const { data, error } = await supabase
    .from("Item")
    .select("*")
    .eq("item_id", itemId)
    .single();

  if (error) throw error;

  return data;
}

// Update item by item_id
export async function updateItem(itemId, updateData) {
  if (!itemId) throw new Error("Missing itemId");

  const { data, error } = await supabase
    .from("Item")
    .update(updateData)
    .eq("item_id", itemId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateLostReport(lostId, updateData){
    if(!lostId) throw new Error("Missing lostId");

    const {data, error} = await supabase
        .from("LostReport")
        .update(updateData)
        .eq("lost_id", lostId)
        .select()
        .single();

    if(error) throw error;

    return data;
}