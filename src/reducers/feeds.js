import Store from '../store/feeds';

export const initialState = Store;

export default function feedReducer(state = initialState, action) {
  switch (action.type) {
    case 'FEEDS_REPLACE': {
      console.log("reducer: yemler güncelleniyor");
      console.log(action.data);
      return {
        ...state,
        feeds: action.data,
      };
    }
    case 'FEEDS_RESET': {
      console.log("reducer: yemler resetleniyor");
      return {
        ...state,
        feeds: [],
      }
    }
    default:
      return state;
  }
}
