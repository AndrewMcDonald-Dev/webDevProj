const API_URL = "http://localhost:3000/api/";

export const api = async (
	path: string,
	body?: any,
	method?: string,
	headers?: HeadersInit
) => {
	let options: RequestInit = {
		method: method ?? "GET",
		headers,
	}

	if(body) {
		options = {
			method: method ?? "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...options.headers
			},
			cache: "no-cache",
			body: JSON.stringify(body)
		}
	}

	const res = await fetch(`${API_URL}${path}`, options);
	return await res.json();
}