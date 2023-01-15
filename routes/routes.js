const {Router, query} = require('express')
const path = require('path')
const router = Router();
var mysql = require('mysql');

//encrypt
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


var connection = mysql.createConnection({
  host     : 'db',
  port:3306,
  user     : 'admin',
  password : 'admin123',
  database: 'userdata'
});




router.get('/' , (req , res)=>{

    res.sendFile(path.join(__dirname + '/../pages/menu.html'));


      
      

});

router.get('/login' , (req , res)=>{
    if(req.cookies['session_id'])
    {
        let sessionID = req.cookies['session_id'];
        let query = "SELECT * from usuarios where UserEncrynp like "+ mysql.escape(sessionID);
        connection.query(query, function(err, rows) {
            if (err)
            {
                console.log(err.message)
            };

            if(rows.length > 0)
            {
                res.send('Bienvenido ' + rows[0]['name'] + ' ** Borra las cookies si quieres navegar al login **');
            }
          });

    }else
    {
    res.sendFile(path.join(__dirname + '/../pages/login.html'));

    }

});


router.get('/SignUp',(req,res)=>{

    res.sendFile(path.join(__dirname + '/../pages/SignUp.html'));

})


router.post('/SignUp',(req,res)=>{
    console.log(req.body);
    const {user,pass} = req.body;

    let query = "INSERT INTO  usuarios (name,pass,UserEncrynp) VALUES (?,?,?)"
    
    let userpass = user+pass;
    let hash = bcrypt.hashSync(userpass, salt);

    console.log(userpass);

    var values =
    [user,pass,hash];

    connection.query(query, values, function(err, rows) {
        if (err)
        {
    
            console.log(err.message)
            res.send(err.message);
        };

        res.send("registrado correctamente");

      });
      

})

router.post('/log',(req,res) =>{
    const {user,pass} = req.body;

    let query = "SELECT * from usuarios where name like "+ mysql.escape(user) + " and pass like " + mysql.escape(pass);
    var values =
    [user,pass];

    connection.query(query, function(err, rows) {
        if (err)
        {
            console.log(err.message)
        };

        if(rows.length > 0)
        {
            res.cookie('session_id' , rows[0]['UserEncrynp'], {expire : new Date() + 9999});
            res.redirect('back');
            
        }else
        {
            res.send("credenciales incorrectas");
        }
      });
    
});


module.exports = router;