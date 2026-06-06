import { supabase } from "../data/supabase";

/**
 * Reads the currently authenticated Supabase user (if present).
 * Returns: { user } where user is the Supabase user object or null.
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    // Treat auth errors as "no user"
    return { user: null };
  }

  return { user: data?.user ?? null };
}

// Fetch profile details
export async function fetchProfileByUserId(userId) {
  if (!userId) throw new Error("Missing userId");

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, phone_number")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return {
    name: data?.full_name ?? "",
    email: "", 
    phone: data?.phone_number ?? "",
  };
}

// Fetch history (lost/found events) for the user.
export async function fetchHistoryByUserId(userId) {
  if (!userId) throw new Error("Missing userId");

  const { data, error } = await supabase
    .from("history")
    .select("id, status, date_lost, item_name, campus, location")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    status: row.status,
    dateLost: row.date_lost,
    itemName: row.item_name,
    campus: row.campus,
    location: row.location,
  }));
}

