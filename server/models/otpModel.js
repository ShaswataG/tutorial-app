const { supabase } = require("../connect")

const insertOtp = async (otp, expirationTime) => {
    const { data, error } = await supabase
        .from('otp')
        .insert({
            otp: otp,
            expiration_time: expirationTime,
            verified: false
        })
    if (error) {
        throw new Error(error);
    }
    return data;
}
