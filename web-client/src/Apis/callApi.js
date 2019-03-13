
export var callApi = function(url, header, method, data) {
    return new Promise(function(resolve, reject) {
        fetch(url, {
            headers: header,
            method: method,
            body: data
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            resolve(data);
        }).catch(function(err) {
            reject(err);
        });
    })
}