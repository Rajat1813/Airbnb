module.exports = (fn) => {
    return (req,res,next) => {
         fn(req,res,next).catch(next);
      };
  };


 

  // wrapAsync.js or utility file
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
