// src/components/UserInfo.js
import PropTypes from 'prop-types';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info">
            <img src={user.avatar_url} alt="avatar" />
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>{user.location}</p>
        </div>
    );
};

UserInfo.propTypes = {
    user: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        location: PropTypes.string,
    }).isRequired,
};

export default UserInfo;