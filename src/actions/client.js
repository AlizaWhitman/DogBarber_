import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GET: 'GET'
}

const formatData = data => ({
    ...data,
    id: parseInt(data.id ? data.id : 0)
})

export const get = (data, onSuccess, onFailure) => dispatch => {
    data = formatData(data)
    api.client().getClient(data)
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.GET,
                    payload: response.data,
                })
                if(response){
                    localStorage.setItem("CurrentClient", JSON.stringify(response.data))
                    onSuccess()
                } 
            })
        .catch(onFailure())
}

export const create = (data, onSuccess, onFailure) => dispatch => {
    data = formatData(data)
    api.client().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            if(res){
                localStorage.setItem("CurrentClient", JSON.stringify(res.data))
                onSuccess()
            }
        })
        .catch(onFailure())
}
