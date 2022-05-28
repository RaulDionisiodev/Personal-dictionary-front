
import axios from 'axios';
import authHeader from './Auth.header';
const API_URL = 'http://localhost:8080';
class UserService {
 getPublicContent() {
    return axios.get(API_URL + 'all');
 }
}
export default new UserService();
