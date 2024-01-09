
import constant from '../common/constant'
export const loginApi = async (url, data, isFormData) => {
    console.log('URL: ', url);
    console.log('Data: ', data);

    const headers = isFormData ? {} : { 'Content-Type': 'application/json' };

    const requestOptions = {
        method: 'POST',
        headers,
        body: isFormData ? data : JSON.stringify(data)
    };

    console.log('requestOptions =>', requestOptions);

    try {
        console.log('im here ')
        const response = await fetch(url, requestOptions);
        console.log('response =>', response);
        if (!response.ok) {
            // Handle non-successful responses here
            console.error('Request failed with status:', response.status);
            return { error: `Request failed with status: ${response.status}` };
        }

        const result = await response.json();
        console.log('result =>', result);

        return result;
    } catch (error) {
        // Handle network errors or exceptions
        console.error('Network error:', error);
        return { error: 'Network request failed', details: error.message };
    }
};


export const signupApi = async (url, data, isFormData) => {
    console.log('URL: ', url);
    console.log('Data: ', data);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result);
            return data;
        })
        .catch(error => {
            console.log('error=>', error);
            return error;
        });
};
export const dashboardApi = async (url, token) => {
    try {
        token = token.replace(/['"]+/g, '');
        console.log('dashboardApi token ====>', token);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                // Add any additional headers if needed
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


