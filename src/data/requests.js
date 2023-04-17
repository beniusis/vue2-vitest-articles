import axios from "axios";

export const requests = {};

requests.http = axios.create({ baseURL: "http://localhost:3000" });

requests.getAuthors = async function() {
    const response = await this.http.get("/authors");
    return response.data;
}

requests.getArticle = async function(id) {
  const response = await this.http.get("/articles/" + id);
  return response.data;
}

requests.getArticles = async function(params) {
  const response = await this.http.get("/articles", { params: params });
  return response;
}

requests.createArticle = async function(id, title, body, author, created, updated) {
  const response = await this.http.post("/articles", {
    "id": id,
    "title": title,
    "body": body,
    "author": author,
    "created_at": created,
    "updated_at": updated
  });
  return response;
}

requests.updateArticle = async function(id, title, body, author, created, updated) {
  const response = await this.http.put("/articles/" + id, { 
    "title": title,
    "body": body,
    "author": author,
    "created_at": created,
    "updated_at": updated
  });
  return response;
}

requests.removeArticle = async function(index) {
  const response = await this.http.delete("/articles/" + index);
  return response;
}

export default {
  install(Vue) {
    Vue.prototype.$requests = requests;
  }
};