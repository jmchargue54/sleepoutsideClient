import {getLocalStorage, setLocalStorage} from "./utils.mjs";
const baseURL = import.meta.env.PUBLIC_SERVER_URL;

interface UserStore {
 isLoggedIn:boolean,
 user?:{
     name:string
     email:string
     _id:string
    },
    token:string
}

export const userStore = $state( {isLoggedIn: false, user: {}, token: ""}) as UserStore;

export async function login(email:string, password:string) {
    const response = await fetch(`${baseURL}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if(response.ok) {
        userStore.user = data.user;
        userStore.token = data.token;
        userStore.isLoggedIn = true;
        setLocalStorage('so-user', userStore);
        return data
    } else {
        throw new Error(data.error.message);
}}

export function logout() {
    userStore.user = undefined;
    userStore.token = '';
    userStore.isLoggedIn = false;
    setLocalStorage('so-user', '');
    window.location.href = '/';
}

export function checkAuth() {
    const userData = getLocalStorage('so-user');
    console.log(userData);
    if(userData) {
        userStore.user = userData.user;
        userStore.token = userData.token;
        userStore.isLoggedIn = true;
    } else {
        userStore.user = undefined;
        userStore.token = '';
        userStore.isLoggedIn = false;
    }

    return !!userData;
}
