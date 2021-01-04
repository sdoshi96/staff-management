const AdminModel = require('../models/Admin');
const HRModel = require('../models/HR');

module.exports = {
    getHrDetails : async (req, res) => {
        try {
            const hrDetails = await HRModel.find();
            res.status(200).json(hrDetails)
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    createHr : async (req,res) => {
        const hrUser = req.body;
        try {
            const newHrUser = new HRModel(hrUser);
            await newHrUser.save();
            res.status(201).json(newHrUser);
        } catch (error) {
            res.status(409).json({message: error.message})   
        }
    },
    createAdmin : async(req, res) => {
        const adminUser = req.body;
        try {
            const newAdmUser = new AdminModel(adminUser);
            await newAdmUser.save();
            res.status(201).json(newAdmUser);
        } catch (error) {
            res.status(409).json({message: error.message})   
        }
    }
}