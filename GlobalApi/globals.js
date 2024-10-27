// file for all the global api calls to the database
import axios from 'axios';
import poll from '../models/poll';
import user from '../models/user';
import mongoose from 'mongoose';

require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

export const getPolls = async () => {
    try {
        const polls = await poll.find();
        return polls;
    } catch (error) {
        throw error;
    }
}

export const getPollById = async (id
) => {
    try {
        const poll = await poll.findById(id);
        return poll;
    } catch (error) {
        throw error;
    }
}

export const createPoll = async (pollData) => {
    try {
        const createdPoll = await poll.create(pollData);
        return createdPoll;
    } catch (error) {
        throw error;
    }
}

export const updatePoll = async (id, pollData) => {
    try {
        const poll = await poll.findById(id);
        if (poll) {
            await poll.update(pollData);
            return poll;
        }
        return null;
    } catch (error) {
        throw error;
    }
}   

export const deletePoll = async (id) => {
    try {
        const poll = await poll.findById(id);
        if (poll) {
            await poll.remove();
            return poll;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const users = await user.find();
        return users;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const user = await user.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

export const createUser = async (userData) => {
    try {
        const createdUser = await user.create(userData);
        return createdUser;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const user = await user.findById(id);
        if (user) {
            await user.update(userData);
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const user = await user.findById(id);
        if (user) {
            await user.remove();
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const login = async (userData) => {
    try {
        const user = await user.findOne({ email: userData.email });
        if (user) {
            if (user.password === userData.password) {
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const user = await user.findOne({ email: userData.email });
        if (!user) {
            const createdUser = await user.create(userData);
            return createdUser;
        }
        return null;
    }
    catch (error) {
        throw error;
    }
}