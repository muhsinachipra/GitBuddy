// src/components/RepositoryList.js
import PropTypes from 'prop-types';

const RepositoryList = ({ repositories, onRepoClick, onFollowersClick }) => {
    return (
        <div className="repository-list">
            <button onClick={onFollowersClick}>View Followers</button>
            <ul>
                {repositories.map((repo) => (
                    <li key={repo.id} onClick={() => onRepoClick(repo)}>
                        {repo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

RepositoryList.propTypes = {
    repositories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRepoClick: PropTypes.func.isRequired,
    onFollowersClick: PropTypes.func.isRequired,
};

export default RepositoryList;