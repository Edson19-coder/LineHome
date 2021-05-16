const sql = require("../db/db");

const PublicationEvaluation = function(publicationEvaluation) {
    this.id = publicationEvaluation.id;
    this.publicationId = publicationEvaluation.publicationId;
    this.userId = publicationEvaluation.userId;
    this.evaluation = publicationEvaluation.evaluation;
}

PublicationEvaluation.addEvaluation = (newEvaluation, result) => {
    sql.query("INSERT INTO publication_evaluation SET ?", newEvaluation, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newEvaluation.id = res.insertId;
        console.log("created evaluation: ", newEvaluation);
        result(null, newEvaluation);
    });
};

PublicationEvaluation.getEvaluationByPublication = (publicationId, result) => {
    sql.query("CALL `proc_evaluation_publication`(?);", publicationId, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            console.log("found evaluation: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

PublicationEvaluation.getEvaluationByUserAndPublication = (evaluation, result) => {
    sql.query("SELECT * FROM publication_evaluation WHERE publicationId = ? AND userId = ?",
     [evaluation.publicationId, evaluation.userId], (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            console.log("found evaluation: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
     });
};

PublicationEvaluation.updateEvaluationByUser = (updateEvaluation, result) => {
    sql.query("UPDATE `publication_evaluation` SET `evaluation` = ? WHERE publicationId = ? AND userId = ?", 
    [updateEvaluation.evaluation, updateEvaluation.publicationId, updateEvaluation.userId], (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated publication: ", { id: updateEvaluation.id, ...updateEvaluation });
          result(null, { id: updateEvaluation.id, ...updateEvaluation });
    })
};

module.exports = PublicationEvaluation;