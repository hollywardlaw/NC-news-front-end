import axios from 'axios';
import { navigate } from '@reach/router';
const url = 'https://holly-nc-news.herokuapp.com/api';

export const getSingleArticle = id => {
  return axios.get(`${url}/articles/${id}`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const getComments = id => {
  return axios.get(`${url}/articles/${id}/comments`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const getTopics = () => {
  return axios.get(`${url}/topics`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const getArticles = (topic, sort_by) => {
  return axios
    .get(`${url}/articles`, {
      params: {
        sort_by,
        topic
      }
    })
    .catch(err => {
      navigate('/error', { replace: true });
    });
};

export const getUsers = () => {
  return axios.get(`${url}/users`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const getUser = username => {
  return axios.get(`${url}/users/${username}`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const postArticle = async articleToPost => {
  const { data } = await axios
    .post(`${url}/articles/`, articleToPost)
    .catch(err => {
      navigate('/error', { replace: true });
    });
  return data.article;
};

export const postTopic = async topicToPost => {
  const { data } = await axios.post(`${url}/topics`, topicToPost).catch(err => {
    navigate('/error', { replace: true });
  });
  return data.topic;
};

export const postComment = async (commentToPost, articleID) => {
  const { data } = await axios
    .post(`${url}/articles/${articleID}/comments`, commentToPost)
    .catch(err => {
      navigate('/error', { replace: true });
    });
  return data.comment;
};

export const deleteArticle = async articleID => {
  await axios.delete(`${url}/articles/${articleID}`).catch(err => {
    navigate('/error', { replace: true });
  });
};

export const voteOnArticle = async (articleID, amount) => {
  const { data } = await axios
    .patch(`${url}/articles/${articleID}`, {
      inc_votes: amount
    })
    .catch(err => {
      navigate('/error', { replace: true });
    });
  return data;
};

export const voteOnComment = async (article_id, comment_id, amount) => {
  const { data } = await axios
    .patch(`${url}/articles/${article_id}/comments/${comment_id}`, {
      inc_votes: amount
    })
    .catch(err => {
      navigate('/error', { replace: true });
    });
  return data;
};

export const deleteComment = async (articleID, comment_id) => {
  await axios
    .delete(`${url}/articles/${articleID}/comments/${comment_id}`)
    .catch(err => {
      navigate('/error', { replace: true });
    });
};

export const getUserArticles = author => {
  return axios.get(`${url}/articles?author=${author}`).catch(err => {
    navigate('/error', { replace: true });
  });
};
