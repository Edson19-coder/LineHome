const sql = require("../db/db");

const PublicationPhoto = function(PublicationPhoto) {
    this.id = PublicationPhoto.id;
    this.publicationId = PublicationPhoto.publicationId;
    this.image = PublicationPhoto.image;
}

PublicationPhoto.addPublicationPhoto = (newPublicationPhoto, result) => {
    sql.query("INSERT INTO publication_photo SET ?", newPublicationPhoto, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newPublicationPhoto.id = res.insertId;
        //console.log("created publication photo: ", newPublicationPhoto);
        result(null, newPublicationPhoto);
    });
};

PublicationPhoto.getPublicationPhotoByPublicationId = (publicationId, result) => {
    sql.query("SELECT * FROM publication_photo WHERE publicationId = ?", publicationId, (error, res) =>{
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        var images = [];
        if(res.length) {

                for(let i = 0; i < res.length ; i++){
                    if(res[i].image != null) {
                         var buffer = new Buffer.from( res[i].image, 'binary' );
                        var bufferBase64 = buffer.toString('base64');
                        res[i].image = bufferBase64;
                        
                        images.push(res[i]);
            }
        }
            //console.log("found publication photo: ", res[0]);
            result(null,images );
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

PublicationPhoto.getFirstImageByPublication = (publicationId, result) => {
    sql.query("SELECT * FROM publication_photo WHERE publicationId = ? LIMIT 1", publicationId, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {

            if(res[0].image != null) {
                var buffer = new Buffer.from( res[0].image, 'binary' );
                var bufferBase64 = buffer.toString('base64');
                res[0].image = bufferBase64;
            }

         // console.log("found publication photo: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = PublicationPhoto;