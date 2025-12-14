import { supabase } from "@/lib/supabase";
import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error al salir:", error);
  }

  return {
    ...context,
    handleLogout
  }
}