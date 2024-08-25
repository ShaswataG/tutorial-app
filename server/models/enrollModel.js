const { supabase } = require('../connect');

const getTutorsByCourseId = async (courseId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*, user_roles(role, is_owner)')
            .eq('user_roles.course_id', courseId)
            .eq('user_roles.is_owner', true);
        if (error)
            throw new Error(`Couldn't fetch`)
    } catch (error) {
        throw new Error(error.message);
    }
    return data;
}

const enrollUser = async (userLoggedIn, courseId) => {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .insert({
                user_id: userLoggedIn.id,
                course_id: courseId,
                role: 'student',
                is_owner: false
            })
    } catch (error) {
        throw new Error(error.message);
    }
    return data;
}

module.exports = {
    getTutorsByCourseId,
    enrollUser
}