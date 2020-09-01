import axios from 'axios';

const baseUrl = "https://localhost:44373/api/"

export default {

    queue(url = baseUrl + 'queue/') {
        return {
            getQueue: () => axios.get(url),
            getAppointment: id => axios.get(url + id),
            create: newAppointment => axios.post(url, newAppointment),
            update: (id, updatedAppointment) => axios.put(url + id, updatedAppointment),
            delete: id => axios.delete(url + id)
        }
    },

    client(url = baseUrl + 'clients/') {
        return {
            getClient:client => axios.post(url + 'LogIn' ,client),
            create: client => axios.post(url, client),
            update: (id, updatedClient) => axios.put(url+id, updatedClient),
            delete: id => axios.delete(url + id)
        }
    }
}
