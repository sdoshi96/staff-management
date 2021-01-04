const EmpModel = require('../models/Employee');

module.exports = {
    getProfileDetails : async(req, res) => {
        const { id } = req.params
        try {
            const profile = await EmpModel.findById(id);
            res.status(200).json(profile);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

