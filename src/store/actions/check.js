import { logoutUserAction } from "./user";

export function checkTokenExpired(result, dispatch) {
    console.log('Check token');
    console.log(result);
    if (result && result.status === 401) {
        dispatch(logoutUserAction());
        return true;
    }

    return false;
}
