const server = require('./server.js');
const url = server.domain;
 
module.exports = {
  detail:'/api/wx/drawing',
  send:'/api/wx/house',
  design:'/api/wx/house',
  quotation:'/api/wx/house',
  getDrawer:'/api/wx/drawing/index',
  getPictureList: '/api/wx/drawing',
  getProperty:'/api/wx/drawing/property',
  login: '/api/wx/custom/login',
  userMsg: '/api/wx/custom/current',
  wxlogin: url + '/api/wx/user/login',
  postUserInfo: '/api/wx/user/userInfo',
  register: '/api/wx/custom/register',
  smsCode: '/api/wx/custom/smsCode',
};
