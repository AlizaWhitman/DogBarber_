import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GET_ALL: 'GET_ALL'
}

const formatData = data => ({
    ...data,
    id: parseInt(data.id ? data.id : 0),
    clientId: parseInt(data.clientId ? data.clientId : 0),
    bookingHour: new Date().toISOString().slice(0,19)
    
})

export const getQueue = () => dispatch => {
    api.queue().getQueue()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.GET_ALL,
                    payload: response.data
                })

            })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data)
    api.queue().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);
    api.queue().update(id, data ,onSuccess)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.queue().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}