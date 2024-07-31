const { supabase } = require('../connect');

const createCourse = async (newCourseInfo) => {
    let { title, description, isPaid, price, authorId } = newCourseInfo;
    let { data, error } = await supabase
        .from('courses')
        .insert({
            title: title,
            description: description,
            is_paid: isPaid,
            price: price,
            author_id: authorId
        });
    if (error)
        throw new Error(error);
    return data;
}

const getCourses = async () => {
    let { data, error } = await supabase
        .from('courses')
        .select('*')
    if (error)
        throw new Error(error);
    return data;
}

const getCourse = async (courseId) => {
    let { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId);
    if (error)
        throw new Error(error);
    return data;
}

module.exports = {
    createCourse,
    getCourses,
    getCourse
}