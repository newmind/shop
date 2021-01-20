
import Identity from './identity.mjs';
import Passport from './passport.mjs';


export default (router) => {

  Identity(router);
  Passport(router);
};
