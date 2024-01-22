
export const validateSchema = (schema,replaceBody = false) => (req, res, next) => {
    try {
        
        const validatedBody = schema.parse(req.body);
        if(replaceBody) req.body = validatedBody;
        next()
    } catch (error) {
        console.log(error.errors);
        return res.status(400).json({ msg: error.errors.map(err => err.message) })
    }

}