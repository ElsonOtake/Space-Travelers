import { useDispatch } from 'react-redux';
import { reserveRocket } from '../redux/rockets/Rockets';

/** @param {{ id: string, name: string, description: string, reserved: boolean }} props */
const Rocket = (props) => {
  const {
    id, name, description, reserved,
  } = props;

  const dispatch = useDispatch();

  const reserve = () => {
    dispatch(reserveRocket(id));
  };

  return (
    <div className="ShipContainer" key={id}>
      <div className="dataContainer">
        <p className="name">{ name }</p>
        <p className="details">
          {reserved && (
          <span
            className="done"
          >
            Reserved
          </span>
          )}
          { description }
        </p>
        {!reserved && (
          <button
            className="reserve"
            onClick={reserve}
            type="button"
          >
            Reserve Rocket
          </button>
        )}
        {reserved && (
          <button
            className="cancel"
            onClick={reserve}
            type="button"
          >
            Cancel Reservation
          </button>
        )}
      </div>
    </div>
  );
};

export default Rocket;
