const sql = require("../db/db");

var moment = require('moment');

const Publication = function(publication) {
    this.id = publication.id;
    this.titlePublication = publication.titlePublication;
    this.description = publication.description;
    this.price = publication.price;
    this.location = publication.location;
    this.category = publication.category;
    this.owner = publication.owner;
    this.createdAt = publication.createdAt; 
}

Publication.addPublication = (newPublication, result) => {
    sql.query("INSERT INTO publication SET ?", newPublication, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newPublication.id = res.insertId;
        newPublication.createdAt = moment.unix(newPublication.createdAt).format("MM/DD/YYYY");
        console.log("created publication: ", newPublication);
        result(null, newPublication);
    });
};

Publication.getPublicationById = (publicationId, result) => {
    sql.query('SELECT * FROM publication WHERE id = ?', publicationId, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            res[0].createdAt =  moment.unix(res[0].createdAt).format("MM/DD/YYYY");
            console.log("found publication: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

Publication.getPublications = (result) => {
    sql.query('SELECT * FROM publication', (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            res.forEach(element => {
                element.createdAt =  moment.unix(element.createdAt).format("MM/DD/YYYY");
            });
            console.log("found publication: ", res);
            result(null, res);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

Publication.updatePublicationById = (publication, result) => {
    sql.query('UPDATE `publication` SET `titlePublication`=?, `description`=?, `price`=?, `location`=?,`category`=? WHERE id = ?',
    [publication.titlePublication, publication.description, publication.price, publication.location, publication.category, publication.id],
    (error, res) => {
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
    
          console.log("updated publication: ", { id: publication.id, ...publication });
          result(null, { id: publication.id, ...publication });
    });
};

Publication.getPublicationByOwner = (ownerId, result) => {
    sql.query('SELECT * FROM publication WHERE owner = ?', ownerId, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            res.forEach(element => {
                element.createdAt =  moment.unix(element.createdAt).format("MM/DD/YYYY");
            });
            console.log("found publication: ", res);
            result(null, res);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Publication;