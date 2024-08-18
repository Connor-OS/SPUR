var express = require('express');
var router = express.Router();

const courseList = ["Language Course", "University", "Private school", "Distance Learning"];
const cityList = ["Newcastle-Upon-Tyne", "York", "Leeds", "Manchester", "Bristol"];
const ageList = ["16+", "7-16"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,
                                    courseList: courseList,
                                    cityList: cityList,
                                    ageList: ageList});
});

module.exports = router;
