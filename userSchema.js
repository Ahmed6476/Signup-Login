
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// mongoose.connect('mongodb+srv://Ahmed_678:Samsung123@cluster0.gxwhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}

});


//we hashing the password
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
});



const User = mongoose.model('users', userSchema);
module.exports = User;
// app.use(cors(["localhost:5000", "localhost:3000"]))
// app.use(express.json())
// app.use('/', express.static(path.join(__dirname, 'web/build')))



// app.post('/api/v1/login', (req, res) => {

//     if (!req.body.email ||
//         !req.body.password
//     ) {
//         console.log("required field missing");
//         res.status(403).send("required field missing");
//         return;
//     }

//     console.log("req.body: ", req.body);


//     User.findOne({ email: req.body.email }, (err, user) => {

//         if (err) {
//             res.status(500).send("error in getting database")
//         } else {
//             if (user) {

//                 if (user.password === req.body.password) {
//                     res.send(user);

//                 } else {
//                     res.send("Authentication fail");
//                 }

//             } else {
//                 res.send("user not found");
//             }
//         }

//     })
// })
// app.post('/api/v1/signup', (req, res) => {

//     if (!req.body.email ||
//         !req.body.password ||
//         !req.body.name
//     ) {
//         console.log("required field missing");
//         res.status(403).send("required field missing");
//         return;
//     } else {

//         console.log(req.body)

//         let newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//         })
//         newUser.save(() => {
//             console.log("data saved")
//             res.send('profile created')
//         })
//     }

// })


// app.delete('/api/v1/profile', (req, res) => {
//     res.send('profile deleted')
// })

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`)
// })