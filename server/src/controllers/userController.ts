// server\src\controllers\userController.ts

import { Request, Response } from 'express';
import User from '../models/User';
import axios from 'axios';

// Save user details from GitHub API
export const saveUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(200).json(existingUser);

        // Fetch user data from GitHub API
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const followersResponse = await axios.get(userResponse.data.followers_url);
        const followingResponse = await axios.get(userResponse.data.following_url.replace('{/other_user}', ''));

        const userData = {
            username: userResponse.data.login,
            githubId: userResponse.data.id.toString(),
            avatarUrl: userResponse.data.avatar_url,
            location: userResponse.data.location,
            bio: userResponse.data.bio,
            blog: userResponse.data.blog,
            followers: followersResponse.data.map((f: any) => f.login),
            following: followingResponse.data.map((f: any) => f.login),
            publicRepos: userResponse.data.public_repos,
            publicGists: userResponse.data.public_gists,
            joined: new Date(userResponse.data.created_at),
        };

        // Save user to the database
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
