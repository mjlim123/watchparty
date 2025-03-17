const URL = import.meta.env.VITE_API_URL;


export async function get(endpoint, param = "") {
    const url = param ? `${URL}/${endpoint}/${param}` : `${URL}/${endpoint}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
}

export async function post(endpoint, data, param = "") {
    const url = param ? `${URL}/${endpoint}/create${param}`: `${URL}/${endpoint}/create`;
    const response = await fetch(url, {
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
};


export async function remove(endpoint, param = "") {
    const url = param ? `${URL}/${endpoint}/delete/${param}`: `${URL}/${endpoint}`;

}

