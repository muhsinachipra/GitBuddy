// src/pages/FollowerDetails.js
import PropTypes from 'prop-types';
import FollowersList from '../components/FollowersList';

const FollowerDetails = ({ followers, onFollowerClick }) => {
    return <FollowersList followers={followers} onFollowerClick={onFollowerClick} />;
};

FollowerDetails.propTypes = {
    followers: PropTypes.array.isRequired,
    onFollowerClick: PropTypes.func.isRequired,
};

export default FollowerDetails;
