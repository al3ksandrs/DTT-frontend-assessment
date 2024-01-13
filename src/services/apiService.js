import {router} from "@/index.js";

export async function fetchHouses(apiKey) {
    try {
        const response = await fetch("https://api.intern.d-tt.nl/api/houses", {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch houses');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching houses:', error);
        throw error;
    }
}

export async function createHouse(apiKey, formData) {
    try {
        const response = await fetch("https://api.intern.d-tt.nl/api/houses", {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to create house');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating house:', error);
        throw error;
    }
}

export async function uploadImage(apiKey, houseId, image) {
    try {
        let formData = new FormData();
        formData.append('image', image);

        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export async function fetchHouseDetails(apiKey, houseId) {
    try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch house details');
        }

        // Needed to specify the position of house in the array since the GET request returns a single object array instead of only the object.
        return (await response.json())[0];
    } catch (error) {
        console.error('Error fetching house details:', error);
        throw error;
    }
}

export async function deleteHouse(apiKey, houseId) {
    try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
            method: 'DELETE',
            headers: {
                'X-Api-Key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete house');
        }
    } catch (error) {
        console.error('Error deleting house:', error);
        throw error;
    }
}

export async function editHouse(apiKey, houseId, formData) {
    try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to edit house');
        }

        // Redirect user to the edited listing
        router.push({name: 'House details', params: {id: houseId}});

        return await response.json();
    } catch (error) {
        console.error('Error editing house:', error);
        throw error;
    }
}