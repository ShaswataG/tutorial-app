const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const apiKey = process.env.API_KEY;

console.log(supabaseUrl, apiKey)
const supabase = createClient(supabaseUrl, apiKey)

// console.log(supabase);

module.exports = { supabase };