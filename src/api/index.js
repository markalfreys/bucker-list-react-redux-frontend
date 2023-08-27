const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export const getList = async (data) => {
    return await fetch(`${BACKEND_URL}/list/getList/${data}`)
                .then(res => res.json());
}

export const addList = async (data) => {
    return await fetch(`${BACKEND_URL}/list/newList`, {
        method: 'POST',
        body: JSON.stringify({ item: data }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res => res.json());
}

export const updateList = async (data) => {
    return await fetch(`${BACKEND_URL}/list/updateList`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res => res.json());
}

export const deleteList = async (data) => {
    return await fetch(`${BACKEND_URL}/list/removeList/${JSON.stringify(data)}`, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res => res.json());
}

export const setDoneList = async (data) => {
    return await fetch(`${BACKEND_URL}/list/setDoneList`, {
        method: 'PATCH',
        body: JSON.stringify({ id: data }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res => res.json());
}