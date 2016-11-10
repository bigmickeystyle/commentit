
exports.register = function(inputs){
    return new Promise(function(resolve,reject){
        if (!inputs.username){
            reject("username");
        } else {
            if (!inputs.password || inputs.password.length < 6 || inputs.password.length > 10){
                reject("password");
            } else {
                resolve();
            }
        }
    });
};
