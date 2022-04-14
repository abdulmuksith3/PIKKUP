export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const initialState = {
    user: null,
    isLogout: false
}

export function AuthReducer(state, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogout: false,
                user: action.payload,
            }
        case LOGOUT:
            return {
                ...state,
                isLogout: true,
                user: null,
            }
        default:
            return state;
    }
}