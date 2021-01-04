const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    mobile: Number,
    skypeId: String,
    profilePic: String,
    role : {
        type: String,
        default: 'employee'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

employeeSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
  
    this.password = hash;
    next();
  });
  
  employeeSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  };

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;