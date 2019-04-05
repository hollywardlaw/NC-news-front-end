import axios from 'axios';
const url = 'https://holly-nc-news.herokuapp.com/api';

export const getSingleArticle = id => {
  return axios.get(`${url}/articles/${id}`);
};

export const getComments = id => {
  return axios.get(`${url}/articles/${id}/comments`);
};

export const getTopics = () => {
  return axios.get(`${url}/topics`);
};

export const getArticles = (topic, sort_by) => {
  return axios.get(`${url}/articles`, {
    params: {
      sort_by,
      topic
    }
  });
};

export const getUsers = () => {
  return axios.get(`${url}/users`);
};

export const postArticle = async articleToPost => {
  const { data } = await axios.post(`${url}/articles/`, articleToPost);
  return data.article;
};

export const postTopic = async topicToPost => {
  const { data } = await axios.post(`${url}/topics`, topicToPost);
  return data.topic;
};
