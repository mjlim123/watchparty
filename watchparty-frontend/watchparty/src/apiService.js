const URL = import.meta.env.VITE_API_URL;


export async function getAll(endpoint) {
    const response = await fetch(`${URL}/${endpoint}`)
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
    
};

export async function post(endpoint, data) {
    const response = await fetch(`${URL}/${endpoint}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}