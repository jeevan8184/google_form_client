import { TOKEN, UPDATE, USER } from "../constants";

const initState = {
  user: null,
  token: null,
  update: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case USER:
      return { ...state, user: action?.payload };
    case TOKEN:
      localStorage.setItem('token', action.payload);
      return { ...state, token: action?.payload };
    case UPDATE:
      return {...state, update: action?.payload };
    default:
      return state;
  }
};

export default reducer;


