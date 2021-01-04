const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hrSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    mobile: Number,
    skypeId: String,
    profilePic: String,
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    }],
    role : {
        type: String,
        default: 'hr'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

hrSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
  
    this.password = hash;
    next();
  });
  
  hrSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  };

const HR = mongoose.model('HR', hrSchema);

module.exports = HR;