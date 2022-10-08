// 如果使用hashHistory
//import history from 'history/createHashHistory' 

// 使用createBrowserHistory
// import history from 'history/createBrowserHistory' 

var history = require('history').createBrowserHistory;

// 使用方式
//history.goBack();

export default history();