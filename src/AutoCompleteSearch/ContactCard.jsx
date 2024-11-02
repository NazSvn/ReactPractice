import PropTypes from 'prop-types';
import './contactCard.css';

const ContactCard = ({ user }) => {
  return (
    <article className='contact-card'>
      <div className='contact-header'>
        <img
          src={user.image}
          alt={`${user.firstName}'s avatar`}
          className='contact-avatar'
          onError={(e) => {
            `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
            e.target.alt = 'Default avatar';
          }}
        />
        <h2 className='contact-name'>
          {user.firstName} {user.lastName}
          {user?.maidenName && (
            <span className='maiden-name'>({user.maidenName})</span>
          )}
        </h2>
      </div>

      <div className='contact-details'>
        <div className='contact-detail-item'>
          <span className='detail-label'>Age:</span>
          <span className='detail-value'>{user.age}</span>
        </div>

        <div className='contact-detail-item'>
          <span className='detail-label'>Birth Date:</span>
          <span className='detail-value'>
            {new Date(user.birthDate).toLocaleDateString()}
          </span>
        </div>

        <div className='contact-detail-item'>
          <span className='detail-label'>Email:</span>
          <a
            href={`mailto:${user.email}`}
            className='detail-value email'
          >
            {user.email}
          </a>
        </div>

        <div className='contact-detail-item'>
          <span className='detail-label'>Phone:</span>
          <a
            href={`tel:${user.phone}`}
            className='detail-value phone'
          >
            {user.phone}
          </a>
        </div>
      </div>
    </article>
  );
};

ContactCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    maidenName: PropTypes.string,
    age: PropTypes.number.isRequired,
    birthDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactCard;
