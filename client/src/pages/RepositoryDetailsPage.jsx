// src/pages/RepositoryDetailsPage.js
import PropTypes from 'prop-types';
import RepositoryDetails from '../components/RepositoryDetails';
import '../styles/RepositoryDetailsPage.css';

const RepositoryDetailsPage = ({ repository }) => {
    return <RepositoryDetails repository={repository} />;
};

RepositoryDetailsPage.propTypes = {
    repository: PropTypes.object.isRequired,
};

export default RepositoryDetailsPage;