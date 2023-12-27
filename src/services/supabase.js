import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lqvainrmvhhrkevkukcy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmFpbnJtdmhocmtldmt1a2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwOTE1NzYsImV4cCI6MjAxNzY2NzU3Nn0.oCEGAD3R9nk6WwVlE1moK9irE4s8HoTsZ8KUp-Aj_-c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;