exports.register = function(inputs){
    return new Promise(function(resolve,reject){
        if (!inputs.username){
            reject("username");
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
        if (error == "password length") {
            reject(error);
        } else if (error == "password not defined" || error == undefined){
            if(inputs.email){
                if (inputs.email.search("@") == -1){
                    reject("email");
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
            return "password length";
        }
    } else {
        return "password not defined";
    }
}
