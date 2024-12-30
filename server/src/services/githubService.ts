import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
    throw new Error('GitHub token is not defined in the environment variables.');
}

const githubAxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
    },
});

export const fetchGithubUserData = async (username: string) => {
    const userResponse = await githubAxiosInstance.get(`/users/${username}`);
    const followersResponse = await githubAxiosInstance.get(userResponse.data.followers_url);
    const followingResponse = await githubAxiosInstance.get(userResponse.data.following_url.replace('{/other_user}', ''));

    return {
        user: userResponse.data,
        followers: followersResponse.data.map((f: any) => f.login),
        following: followingResponse.data.map((f: any) => f.login),
    };
};
