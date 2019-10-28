import member from './member';
import recipes from './recipes';
import accounts from './accounts';
import feeds from './feeds';
import points from './points';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  member,
  recipes,
  accounts,
  feeds,
  points,
};
