class EpicHTTP {

    // make a get request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    // // make an http post request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    // make an http post request
    // post(url, data) {
    //     return new Promise((resolve, reject) => {
    //         fetch(url, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify(data)
    //             })
    //             .then(res => res.json)
    //             .then(data => resolve(data))
    //             .catch(err => reject(err));
    //     });
    // }
    // make an http put request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    // make an http delete  request
    async delete(url, data) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await 'Resource deleted'
        return resData;
    }
}