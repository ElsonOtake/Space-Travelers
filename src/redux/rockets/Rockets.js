import axios from 'axios';

const GET_ROCKETS = 'test/rockets/GET_ROCKETS';

const initialState = [];

const rocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROCKETS:
      return action.payload;
    default:
      return state;
  }
};

const getList = () => async (dispatch) => {
  const response = await axios.get('https://api.spacexdata.com/v3/rockets');
  const newArray = response.data.map((info) => {
    const details = {
      name: info.rocket_name,
      id: info.id,
      description: info.description,
      image: info.flickr_images,
    };
    return details;
  });
  dispatch({
    type: GET_ROCKETS,
    payload: newArray,
  });
};

export default rocketsReducer;
export { getList };