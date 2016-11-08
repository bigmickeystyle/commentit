exports.split = function(string, storage_location){
    if (string) {
        if (string.search(",") == -1) {
            storage_location = [string];
        } else {
            string = string.split(",");
            storage_location = string.map(function(elem){
                return elem.trim();
            });
        }
    } else {
        storage_location = [];
    }
};
