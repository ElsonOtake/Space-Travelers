import { useState } from 'react';

/** @param {{ name: string, image?: string | null }} props */
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

export default CrewPhoto;
