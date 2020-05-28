module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUser(res, mysql, context, complete){
        mysql.pool.query("SELECT user_id as id, username, password FROM users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.media  = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMedia(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('login', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "READ FROM login (username, password)";
        var requests = [req.body.username, req.body.password];
        sql = mysql.pool.query(sql,requests,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/login');
            }
        });
    });


return router;
}();

