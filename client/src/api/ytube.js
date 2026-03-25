import axios from "./instance"

export const api = axios.create({
    baseURL: "/api/ytube",
});

export const getVideoByName = async (query) => {

    const response = await api.get('/video', {
        params: {
            type: 'video',
            videoCategoryId: 30,
            videoDuration: 'long',
            q: query
        }

    })
        .then(res => res.data)
        .catch(err => console.error(err))

    console.groupCollapsed('/api/ytube/video')
    console.log(response)
    console.groupEnd()

    return response
}