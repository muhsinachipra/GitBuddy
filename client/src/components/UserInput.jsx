// src/components/UserInput.js
import { useState } from 'react';
import PropTypes from 'prop-types';

const UserInput = ({ onSearch }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onSearch(username);
            setUsername('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-input">
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};
UserInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default UserInput;