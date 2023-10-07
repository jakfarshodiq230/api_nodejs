const pool = require('../config/conection');
pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
// activity
    // get all
    getActivity(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                SELECT * FROM activities WHERE deleted_at IS NULL`
            , function (error, results) {
                if(error) throw error;  
                res.json({ 
                    success: 'Success', 
                    message: 'Success',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // get id
    getActivityByID(req, res) {
        let activity_id = req.params.activity_id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                SELECT * FROM activities WHERE deleted_at IS NULL AND activity_id = ?`, [activity_id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: 'Success', 
                    message: 'Success',
                    data: results 
                });
            });
            connection.release();
        })
    },
    //post
    addActivity(req, res) {
        let data = {
            email: req.body.email,
            title: req.body.title
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                INSERT INTO activities SET ?`, [data]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: 'Success', 
                    message: 'Berhasil insert data',
                    data: results
                });
            });
            connection.release();
        })
    },
    //put
    updateActivity(req, res) {
        let data = {
            email: req.body.email,
            title: req.body.title
        }
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                UPDATE activities SET ? WHERE activity_id = ?`, [data, id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: 'Success', 
                    message: 'Berhasil update data',
                });
            });
            connection.release();
        })
    },
    //delete
    deleteActivity(req, res) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        const currentDate =year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        let dataUpdate = {
            deleted_at : currentDate
        };
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(`
                UPDATE activities SET ? WHERE activity_id = ?`, [dataUpdate, id]
            , function (error, results) {
                if(error) throw error;
                res.json({ 
                    success: 'Not Found', 
                    message: 'Activity with ID '+id+' Not Found',
                });
            });
            connection.release();
        })
    }
}