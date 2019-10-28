import Store from '../store/points';

export const initialState = Store;

export default function pointReducer(state = initialState, action) {
  switch (action.type) {
    case 'LEADERBOARD_REPLACE': {
      return {
        ...state,
        points: action.data,
      };
    }
    default:
      return state;
  }
}
