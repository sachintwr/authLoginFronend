//import { Dimensions } from 'react-native';
/*need to chage as per development or prodcution*/

const serverURL = "https://login-auth-backend-u32w.vercel.app/"
const apiURL = serverURL + "api/";

const isAWS = false;

const headerFormData = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
};
const headerURLEncoded = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ',
};

const headerJSON = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //"Authorization": 'Bearer ',
};

const constant = {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,

    latLong: {
        latitude: '',
        longitude: ''
    },

    headerFormData: headerFormData,
    headerURLEncoded: headerURLEncoded,
    headerJSON: headerJSON,

    primaryGradiantColor: '#FFFFFF',
    secondaryGradiantColor: '#FFFFFF',
    primarieGradiantColor: '#F1F4FB',
    secondarieGradiantColor: '#F1F4FB',
    borderColor: '#EFF4F9',
    border2Color: '#EFF4F9',
    InActiveIconColor: '#A2A8C2',
    ActiveIconColor: '#74B1FA',
    display: 'flex',

    IDPrefix: 'bb-',
    isAws: isAWS,
    serverUrl: serverURL,
    apiUrl: apiURL,
    loginUrl: apiURL + 'auth/login',
    signupUrl: apiURL + 'auth/register/',
    dashboardUrl: apiURL + 'auth/dashboard/',
}
export default constant;