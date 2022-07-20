import PropTypes from 'prop-types';

const Rocket = (props) => {
  const {
    id, name, description, image,
  } = props;


  return (
    <div className="ShipContainer" key={id}>
      <div className="imageContainer">
        <img
          className="image"
          src={image}
          alt={id}
        />
      </div>
      <div className="dataContainer">
        <p className="name">{ name }</p>
        <p className="details">
          { description }
        </p>
        
          <button
            className="reserve"
            type="button"
          >
            Reserve Rocket
          </button>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

export default Rocket;