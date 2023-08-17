// ======= USER CRUD ================== //

export async function createUser(id){
    const response = await fetch(`http://localhost:8080/saveUser`, {
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
    const response = await fetch(`http://localhost:8080/getUser?id=${id}`, {
        method: 'GET',
    });
    console.log("wtf", response);
    if(!response) {throw new Error('Error');}
    const data = await response.json();
    console.log("data = ", data);
    return data; 
}

export async function updateScore(id, score){
    const response = await fetch(`http://localhost:8080/updateScore`, {
        method: 'PUT',
        headers: {"Content-Type":'application/json',},
        body: JSON.stringify({id: id, score : score}),
    });
    console.log("res: ", response);
    return response.ok;
}

export async function deleteUser(id){
    const response = await fetch(`http://localhost:8080/deleteUser`, {
        method: 'DELETE',
        headers: {"Content-Type":'application/json',},
        body: JSON.stringify({id: id }),
    });
    console.log("response: ", response);
    return response.ok;
}