// src/components/FollowersList.js
import PropTypes from 'prop-types';

const FollowersList = ({ followers, onFollowerClick }) => {
    return (
        <div className="followers-list">
            <ul>
                {followers.map((follower) => (
                    <li key={follower.id} onClick={() => onFollowerClick(follower)}>
                        <img src={follower.avatar_url} alt="avatar" />
                        <span>{follower.login}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

FollowersList.propTypes = {
    followers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar_url: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        })
    ).isRequired,
    onFollowerClick: PropTypes.func.isRequired,
};

export default FollowersList;