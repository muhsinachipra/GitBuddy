// server\src\controllers\userController.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import User from '../models/User';

export const saveUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.params;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(304).json(existingUser);
        } else {
            const userResponse = await axios.get(`https://api.github.com/users/${username}`);
            const followersResponse = await axios.get(userResponse.data.followers_url);
            const followingResponse = await axios.get(userResponse.data.following_url.replace('{/other_user}', ''));

            const followers = followersResponse.data.map((f: any) => f.login) || [];
            const following = followingResponse.data.map((f: any) => f.login) || [];

            const mutualFriends = followers.filter((follower: string) => following.includes(follower));

            const userData = {
                username: userResponse.data.login,
                githubId: userResponse.data.id.toString(),
                avatarUrl: userResponse.data.avatar_url,
                location: userResponse.data.location,
                bio: userResponse.data.bio,
                blog: userResponse.data.blog,
                followers,
                following,
                friends: mutualFriends,
                publicRepos: userResponse.data.public_repos,
                publicGists: userResponse.data.public_gists,
                joined: new Date(userResponse.data.created_at),
            };

            const newUser = await User.create(userData);
            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};