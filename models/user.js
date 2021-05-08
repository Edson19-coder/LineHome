const sql = require("../db/db");

const User = function(user) {
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

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
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

module.exports = User;