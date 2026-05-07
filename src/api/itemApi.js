export const getItems = async () => {
    const response = await fetch("http://localhost:5000/items"); // example endpoint
    return response.json();
};