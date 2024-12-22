const getAllPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');

    if (!response.ok) throw new Error("Unable to fetch data");

    return response.json();
};

export default getAllPosts;