
exports.signin = function(inputs){
    return new Promise(function(resolve,reject){
        if (!inputs.username){
            reject("Username not correct.");
        } else {
            var error = checkPassword(inputs.password);
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        }
    });
};
exports.profile = function(inputs){
    return new Promise(function(resolve,reject){
        var error = checkPassword(inputs.password);
        if (error == "Password length needs to be between 6 and 10 characters.") {
            reject(error);
        } else if (error == "Password not defined." || error == undefined){
            if(inputs.email){
                if (inputs.email.search("@") == -1){
                    reject("Email address not valid.");
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        }
    });
};

function checkPassword(password){
    if (password) {
        if (password.length < 6 || password.length > 10){
            return "Password length needs to be between 6 and 10 characters.";
        }
    } else {
        return "Password not defined.";
    }
}
