import jwtDecode from 'jwt-decode';

const getToken = () => localStorage.getItem('userToken');
const getUserFromToken = () => localStorage.getItem('userToken') && jwtDecode(localStorage.getItem('userToken'));
const removeToken = () => localStorage.removeItem('userToken');
const setToken = (token) => localStorage.setItem('userToken', token);

export default { getToken, getUserFromToken, removeToken, setToken };
