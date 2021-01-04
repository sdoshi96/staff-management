const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const AdminModel = require('./models/Admin.js');
const HRModel = require('./models/HR.js');
const EmpModel = require('./models/Employee.js');

require('./auth/adminAuth.js');
require('./auth/hrAuth.js');
require('./auth/empAuth.js');

const routes = require('./routes/admin.js');
const hrRoutes = require('./routes/hr.js');
const empRoutes = require('./routes/employee.js');
const secureRoute = require('./routes/secure-routes.js');


dotenv.config();
const app = express();

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cookieParser());

app.use(cors());
passport.initialize();

app.use('/admin', routes);
app.use('/hr', hrRoutes);
app.use('/emp', empRoutes);
app.use('/admin-secure', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/hr-secure', passport.authenticate('jwt', { session:false }), secureRoute);
app.use('/emp-secure', passport.authenticate('jwt', { session:false }), secureRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
 