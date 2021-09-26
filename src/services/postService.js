import http from './httpService'

class PostService {
    getAll = () => http.get("/posts");    

    get = (id) => http.get(`/posts/${id}`);

    add = (data) => http.post("/posts",data);

    update = (id,data) => http.put(`/posts/${id}`, data);

    delete = (id) => http.delete(`/posts/${id}`);

    filterByTitle = (title) => http.get(`/posts?title=${title}`)

}

export default new PostService();