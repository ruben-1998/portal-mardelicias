import {supabase} from "../client";

export async function signInWithEmail({email, password}) {
    return await supabase.auth.signInWithPassword({email, password});
}

export async function signOut() {
    return await supabase.auth.signOut();
}
