const URL = import.meta.env.VITE_API_URL;

export async function get(endpoint, param = "") {
    const url = param ? `${URL}/api/${endpoint}/${param}` : `${URL}/${endpoint}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(`Error ${response.status}: ${errorData?.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("GET request failed:", error);
        throw error;
    }
}

export async function post(endpoint, data, param = "") {
    const url = param ? `${URL}/api/${endpoint}/create${param}` : `${URL}/api/${endpoint}/create`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(`Error ${response.status}: ${errorData?.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("POST request failed:", error);
        throw error;
    }
}


export async function remove(endpoint, param = "") {
    const url = param ? `${URL}/api/${endpoint}/delete/${param}` : `${URL}/api/${endpoint}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "DELETE", // Specify DELETE method
            headers: {
                "Content-Type": "application/json",
                // Add Authorization headers if needed, e.g., "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.text(); // If the response body is empty, this may fail
    } catch (error) {
        console.error("Error in remove function:", error);
        throw error; // Re-throw for handling at the caller level
    }

}

export async function put(endpoint, param = "") {
    const url = param ? `${URL}/api/${endpoint}/update${param}` : `${URL}/api/${endpoint}`;
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "PUT", // Specify DELETE method
            headers: {
                "Content-Type": "application/json",
                
                // Add Authorization headers if needed, e.g., "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json(); // If the response body is empty, this may fail
    } catch (error) {
        console.error("Error in remove function:", error);
        throw error; // Re-throw for handling at the caller level
    }

}

