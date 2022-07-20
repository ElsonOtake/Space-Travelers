import axios from 'axios';

const GET_ROCKETS = 'Space-Travelers/rockets/GET_ROCKETS';
const RESERVE = 'Space-Travelers/rockets/RESERVE'

const initialState = [];

const rocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROCKETS:
      return action.payload;
      case RESERVE: {
        const newState = state.map((rocket) => {
          if (rocket.id !== action.payload) {
            return rocket;
          }
          return { ...rocket, reserved: !rocket.reserved };
        });
        return newState;
      }
    default:
      return state;
  }
};

// Consume API and get rockets data
// Create an array with specific information gotted from the API
// Dispatch the new array to the rockets reducer
const getList = () => async (dispatch) => {
  const response = await axios.get('https://api.spacexdata.com/v3/rockets');
  const newArray = response.data.map((info) => {
    const details = {
      name: info.rocket_name,
      id: info.id,
      description: info.description,
      image: info.flickr_images,
      reserved: false,
    };
    return details;
  });
  dispatch({
    type: GET_ROCKETS,
    payload: newArray,
  });
};

const reserveRocket = (id) => ({
  type: RESERVE,
  payload: id,
});

export default rocketsReducer;
export { getList, reserveRocket };