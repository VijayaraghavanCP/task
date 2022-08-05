const mysql=require('mysql2');
const express=require('express');
const app=express();
const path=require('path');
const bodyparser=require('body-parser');
const encoder=bodyparser.urlencoded({extended:false});
const connection=mysql.createConnection(
    {
        host : "localhost",
        port : 3306,
        user : "root",
        password : "password",
        database : "user_info"

    }

) ;

connection.connect(function(error){
    if (error) throw error
    else{
        console.log('hey vijay the connection is successful');
    }
});
app.get('/',function(req,res)
{
    res.sendFile(path.join(__dirname,'homepage.html'));
});
app.post('/',encoder,(req,res)=>
{
    const name=req.body.usrname;
    const password=req.body.passwrd;
    connection.query('select * from usr_info where name= ? and password= ?',[name,password],function(error,results,fields)
    {
        if(results.length>0)
        {
            res.redirect('/datapage');
        }
        else 
        {
            res.redirect('/');
        }
    });
});
app.get('/datapage',(req,res)=>
{
    res.sendFile(path.join(__dirname,'datapage.html'));
});
app.listen(3002);