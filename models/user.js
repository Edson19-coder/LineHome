const sql = require("../db/db");

const User = function(user) {
    this.id = user.id;
    this.userName = user.userName;
    this.email = user.email;
    this.password = user.password;
    this.imageUrl = user.imageUrl;
};

User.addUser = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        newUser.id = res.insertId;
        console.log("created user: ", newUser);
        result(null, newUser );
    });
};

User.checkRegisterUser = (newUser, result) => {
    sql.query(`SELECT * FROM user WHERE userName = "${newUser.userName}" OR email = "${newUser.email}"`, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.getUserByUserOrEmailAndPassword = (user, result) => {
    sql.query(`SELECT * FROM user WHERE userName = "${user.userName}" OR email = "${user.email}" AND password = "${user.password}"`, (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {

            if(res[0].imageUrl != null) {
                var buffer = new Buffer.from( res[0].imageUrl, 'binary' );
                var bufferBase64 = buffer.toString('base64');
                res[0].imageUrl = bufferBase64;
            }

            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.getUserById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${id}`, (error, res) => {
        if(error) { 
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.updateUser = (user, result) => {
    sql.query(`UPDATE user SET userName = ?, email = ?, password = ? WHERE id = ?`, 
    [user.userName, user.email, user.password, user.id], 
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
    
          console.log("updated user: ", { id: user.id, ...user });
          result(null, { id: user.id, ...user });
    });
};

User.uploadImage = (id, imageBlop, result) => {
    sql.query(`UPDATE user SET imageUrl = ? WHERE user.id = ?;`, [imageBlop, id], (error, res) => {
        if(error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated user: ", { id: id});
    });
};

module.exports = User;