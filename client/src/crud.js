// ======= USER CRUD ================== //

export async function createUser(id){
    const response = await fetch(`/saveUser`, {
        method: 'POST',
        headers:{
            "Content-Type":'application/json',
        },
        body : JSON.stringify({ id: id }),
    });
    console.log("res: ", response);
    return response.ok;
}

export async function readUser(id){
    try {
        const response = await fetch(`/getUser?=${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
    }

}

export async function updateScore(id, score){
    const response = await fetch(`/updateScore`, {
        method: 'PUT',
        headers: {"Content-Type":'application/json',},
        body: JSON.stringify({id: id, score : score}),
    });
    console.log("res: ", response);
    return response.ok;
}

export async function deleteUser(id){
    const response = await fetch(`/deleteUser`, {
        method: 'DELETE',
        headers: {"Content-Type":'application/json',},
        body: JSON.stringify({id: id }),
    });
    console.log("response: ", response);
    return response.ok;
}