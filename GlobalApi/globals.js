import Poll from '@/models/poll';
import User from '@/models/user';
import axios from 'axios';

const apiEndpoints = {
    getPolls: '/api/polls',
    getPollById: (id) => `/api/polls/${id}`,
    createPoll: '/api/polls',
    updatePoll: (id) => `/api/polls/${id}`,
    deletePoll: (id) => `/api/polls/${id}`,

    getUsers: '/api/users',
    getUserById: (id) => `/api/users/${id}`,
    createUser: '/api/users',
    updateUser: (id) => `/api/users/${id}`,
    deleteUser: (id) => `/api/users/${id}`
};

const getPolls = async () => {
    const response = await axios.get(apiEndpoints.getPolls);
    return response.data;
};

const getPollById = async (id) => {
    const response = await axios.get(apiEndpoints.getPollById(id));
    return response.data;
};

const createPoll = async (pollData) => {
    const response = await axios.post(apiEndpoints.createPoll, pollData);
    return response.data;
};

const updatePoll = async (id, pollData) => {
    const response = await axios.put(apiEndpoints.updatePoll(id), pollData);
    return response.data;
};

const deletePoll = async (id) => {
    const response = await axios.delete(apiEndpoints.deletePoll(id));
    return response.data;
};

const getUsers = async () => {
    const response = await axios.get(apiEndpoints.getUsers);
    return response.data;
};

const getUserById = async (id) => {
    const response = await axios.get(apiEndpoints.getUserById(id));
    return response.data;
};

const createUser = async (userData) => {
    const response = await axios.post(apiEndpoints.createUser, userData);
    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await axios.put(apiEndpoints.updateUser(id), userData);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(apiEndpoints.deleteUser(id));
    return response.data;
};

const globalApi = {
    getPolls,
    getPollById,
    createPoll,
    updatePoll,
    deletePoll,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default globalApi;