// src/pages/HomePage.js
import { useState } from 'react';
import UserInput from '../components/UserInput';
import UserInfo from '../components/UserInfo';
import RepositoryList from '../components/RepositoryList';
import '../styles/HomePage.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [repositories, setRepositories] = useState([]);

    const handleSearch = async (username) => {
        // Fetch user and repositories from the backend
        const userData = await fetch(`/api/users/${username}`).then((res) => res.json());
        const repoData = await fetch(`/api/users/${username}/repos`).then((res) => res.json());

        setUser(userData);
        setRepositories(repoData);
    };

    return (
        <div className="home-page">
            <UserInput onSearch={handleSearch} />
            {user && <UserInfo user={user} />}
            {repositories.length > 0 && (
                <RepositoryList repositories={repositories} onRepoClick={() => { }} onFollowersClick={() => { }} />
            )}
        </div>
    );
};

export default HomePage;
