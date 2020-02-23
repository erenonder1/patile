import Store from '../store/accounts';

        export const initialState = Store;

export default function accountReducer(state = initialState, action) {
        switch (action.type) {
          case 'ACCOUNTS_REPLACE': {
            return {
              ...state,
        accounts: action.data,
      };
    }

    default:
      return state;
  }
}
