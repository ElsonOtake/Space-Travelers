import { useState } from 'react';
import PropTypes from 'prop-types';

const CrewPhoto = ({ name, image = null }) => {
  const [failed, setFailed] = useState(false);

  return image && !failed ? (
    <img
      className="crew-photo"
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="crew-photo crew-photo-placeholder" role="img" aria-label={`${name}: photo unavailable`}>
      Photo unavailable
    </div>
  );
};

CrewPhoto.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default CrewPhoto;
