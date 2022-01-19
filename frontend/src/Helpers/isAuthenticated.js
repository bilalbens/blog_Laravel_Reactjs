export const isAuthenticated = () => {

    const jwt = localStorage.getItem('auth_token');

    if(jwt){
        return jwt
    }
    return false;

}

