// server\src\controllers\userController.ts

import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { fetchGithubUserData } from '../services/githubService';

interface SearchCriteria {
    isDeleted: boolean;
    username?: string;
    location?: string;
}

export const saveUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.params;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(200).json(existingUser);
            return;
        } else {
            const { user, followers, following } = await fetchGithubUserData(username);
            const mutualFriends = followers.filter((follower: string) => following.includes(follower));
            const userData = {
                username: user.login,
                name: user.name || user.login,
                githubId: user.id.toString(),
                avatarUrl: user.avatar_url,
                location: user.location,
                bio: user.bio,
                blog: user.blog,
                followers,
                following,
                friends: mutualFriends,
                publicRepos: user.public_repos,
                publicGists: user.public_gists,
                joined: new Date(user.created_at),
            };
            const newUser = await User.create(userData);
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const searchUsers = async (req: Request, res: Response) => {
    const { username, location } = req.query;

    try {
        const searchCriteria: any = { isDeleted: false };

        if (username) searchCriteria['username'] = username as string;
        if (location) {
            searchCriteria['location'] = { $regex: new RegExp(location as string, 'i') };
        }

        const users = await User.find(searchCriteria);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const softDeleteUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await User.findOneAndUpdate({ username }, { isDeleted: true }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const updates = req.body;

    try {
        const user = await User.findOneAndUpdate({ username }, updates, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getSortedUsers = async (req: Request, res: Response) => {
    const { sortBy } = req.query;

    try {
        const validFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at', 'joined'];
        if (!validFields.includes(sortBy as string)) {
            res.status(400).json({ message: 'Invalid sort field' });
            return
        } else {
            const users = await User.find({ isDeleted: false }).sort({ [sortBy as string]: -1 });
            res.status(200).json(users);
        }
    } catch (error) {
        console.error('Error fetching sorted users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};