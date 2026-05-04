const supabaseUrl = 'https://wjrljkifzioqaatvolgk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqcmxqa2lmemlvcWFhdHZvbGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Mjk4NDIsImV4cCI6MjA5MzQwNTg0Mn0.aN9_Z7E5IylC0XeBDWlZTQVf3rkD4t9y1d_g0KPQbRI';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export default supabase;
