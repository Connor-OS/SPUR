

export const get = async (req, res, next) => {
    try {
        const cityName = req.params.name;

        res.render('city', {
            city: cityName,
        });
    } catch (error) {
        next(error)
    }
};

