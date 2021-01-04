const mongoose = require('mongoose');
const HRModel = require('../models/HR');
const EmpModel = require('../models/Employee');
const HR = require('../models/HR');

module.exports = {
    createEmployee : async(req, res) => {
        const {id} = req.params;
        const empUser = req.body;
        try {
            const newEmpUser = new EmpModel(empUser);
            await newEmpUser.save();
            await HRModel.findByIdAndUpdate(id, {$push: {employees: newEmpUser._id}});
            res.status(201).json(newEmpUser);
        } catch (error) {
            res.status(409).json({message: error.message})   
        }
    },
    getEmployees : async(req, res) => {
        const { id } = req.params;
        let empDetails = [];
        try {
            const hr = await HRModel.findById(id);
            const temp = hr.employees;
            for(let i=0; i< temp.length; i++){
                let user = await EmpModel.findById(temp[i]);
                empDetails.push(user);
            }
            res.status(200).json(empDetails)
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}