import { createClient } from '@supabase/supabase-js'

// URL dan Key dari environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Buat dan export klien Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)