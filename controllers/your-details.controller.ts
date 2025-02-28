
export const get = async (req, res, next) => {

    res.render('your-details');
};

export const post = async (req, res) => {
    console.log(req.body)
    
    res.redirect("payment")
}
