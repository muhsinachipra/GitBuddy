// src/components/RepositoryDetails.js
import PropTypes from 'prop-types';

const RepositoryDetails = ({ repository }) => {
    return (
        <div className="repository-details">
            <h2>{repository.name}</h2>
            <p>{repository.description}</p>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
            </a>
        </div>
    );
};

RepositoryDetails.propTypes = {
    repository: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        html_url: PropTypes.string.isRequired,
    }).isRequired,
};

export default RepositoryDetails;
