module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getReview(res, mysql, context, complete){
        mysql.pool.query("SELECT review_movie_title, review_title, review_body, review-author FROM review", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile  = results;
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReview(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('userProfile', context);
            }

        }
    });

return router;
}();
