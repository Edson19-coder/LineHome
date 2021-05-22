const sql = require("../db/db");

var moment = require('moment');
 
const SavePublication = function(savePublication) {
    this.id = savePublication.id;
    this.userId = savePublication.userId;
    this.publicationId = savePublication.publicationId;
}

SavePublication.addSavePublication = (newSavePublication, result) => {
    sql.query("INSERT INTO save_publication SET ?", newSavePublication, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newSavePublication.id = res.insertId;
        result(null, newSavePublication);
    });
};

SavePublication.deleteSavePublication = (savePublication, result) => {
    sql.query(`DELETE FROM save_publication WHERE userId = ${savePublication.userId} AND publicationId = ${savePublication.publicationId}`, 
    (error, res) => {
        if (error) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
    
        //console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

SavePublication.getSavePublicationsByUser = (userId, result) => {
    sql.query("CALL `proc_publications_save_user`(?);", userId, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            res.forEach(element => {
                element.createdAt =  moment.unix(element.createdAt).format("MM/DD/YYYY");
            });
            //console.log("found publication: ", res);
            result(null, res);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    })
};

SavePublication.getSavePublicationByUserAndPublication = (savePublication, result) => {
    sql.query("SELECT * FROM save_publication WHERE userId = ? AND publicationId = ?", [savePublication.userId, savePublication.publicationId], (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
           // console.log("found evaluation: ", res[0]);
         
            result(null, res[0]);
            return;
        }
        // not found user with the id
        
        result({ kind: "not_found" }, null);
    })
};




module.exports = SavePublication;