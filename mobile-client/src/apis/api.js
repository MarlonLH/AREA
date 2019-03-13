module.exports = {
    apiPOST (targetUrl,data) {
        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        }) 
    },

    areaPOST (targetUrl, bearer, data) {
        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        }) 
    },

    tokenPOST (targetUrl, bearer, data) {
        return fetch (targetUrl, {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
    },

    apiGET (targetUrl, bearer) {
        return fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
    },

    apiPUT(targetUrl, bearer, data) {
        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
    },

    apiDELETE (targetUrl, bearer) {
        return fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
        })
        .then((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
    },
}