const { supabase } = require('../connect');

const getTutorsByCourseId = async (courseId) => {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .select('users(*), role, is_owner')
            .eq('course_id', courseId)
            .eq('is_owner', true);
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