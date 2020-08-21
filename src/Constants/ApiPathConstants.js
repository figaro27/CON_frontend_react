const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
);

let live = 'https://backend.blockchainnordic.dk/';
let test = 'http://django-test.p3p45twamp.eu-west-1.elasticbeanstalk.com/';

let _inv = {
    LOCAL: 'http://127.0.0.1:8000/',
    DEV: test,
    QA: live,
    PRODUCTION: live,
    ENVIRONMENT: "DEV",
};

module.exports = {
    getApiPath: () => {
        console.log()
        if (production) {
          return _inv.PRODUCTION;
        } else {
          return _inv.DEV;
        }
        // switch(_inv.ENVIRONMENT){
        //     case 'LOCAL':
        //         return _inv.LOCAL;
        //     case 'DEV':
        //         return _inv.DEV;
        //     case 'QA':
        //         return _inv.QA;
        //     case 'PRODUCTION':
        //         return _inv.PRODUCTION;
        //     default:
        //         return _inv.LOCAL;
        // }
    }
};
