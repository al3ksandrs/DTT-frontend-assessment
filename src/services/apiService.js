import {router} from "@/index.js";
import {useAPIkeyStore} from "@/stores/apiKey.js";

// Configuration for API requests.
const apiConfig = {
    baseUrl: "https://api.intern.d-tt.nl/api/houses",
    headers: {
        'X-Api-Key': '', // Gets filled in in fetchWithApiKey()
    },
};

// Fetch JSON data from a given URL with specified options.
async function fetchJson(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }

        // Check if response is empty
        if (response.status === 204) {
            return null;  // Return null for empty responses
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

// Fetch data from the API with the provided API key.
async function fetchWithApiKey(url, method, body = null) {
    const apiKey = useAPIkeyStore().getAPIKey;
    apiConfig.headers['X-Api-Key'] = apiKey;

    const options = {
        method,
        headers: apiConfig.headers,
        body,
    };

    return fetchJson(url, options);
}

// Get all the house's.
export async function fetchHouses() {
    const url = `${apiConfig.baseUrl}`;
    return fetchWithApiKey(url, 'GET');
}

// Create new house.
export async function createHouse(formData) {
    const url = `${apiConfig.baseUrl}`;
    return fetchWithApiKey(url, 'POST', formData);
}

// Upload image for the corresponding house (houseId).
export async function uploadImage(houseId, image) {
    const url = `${apiConfig.baseUrl}/${houseId}/upload`;
    let formData = new FormData();
    formData.append('image', image);
    return fetchWithApiKey(url, 'POST', formData);
}

// Get a house's details.
export async function fetchHouseDetails(houseId) {
    const url = `${apiConfig.baseUrl}/${houseId}`;
    const responseData = await fetchWithApiKey(url, 'GET');
    return responseData[0];
}

// Delete a house.
export async function deleteHouse(houseId) {
    const url = `${apiConfig.baseUrl}/${houseId}`;
    await fetchWithApiKey(url, 'DELETE');
}

// Edit a house.
export async function editHouse(houseId, formData) {
    const url = `${apiConfig.baseUrl}/${houseId}`;
    const response = await fetchWithApiKey(url, 'POST', formData);

    // Redirect user to the edited listing
    router.push({name: 'House details', params: {id: houseId}});

    return response;
}
