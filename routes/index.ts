var express = require('express');
var router = express.Router();

const courseList = ["Language Course", "University", "Private school", "Distance Learning"];
const cityList = ["Newcastle-Upon-Tyne", "York", "Leeds", "Manchester", "Bristol"];
const ageList = ["16+", "7-16"];

const carousel_elements = [{name: "Newcastle", desc: "Newcastle is a captivating city in northeastern England that beckons...", image: "Newcastle.png"},
    {name: "Bristol", desc: "Bristol, a captivating city in southwestern England, is renowned...", image: "Bristol.png"},
    {name: "Manchester", desc: "Manchester, located in the heart of England, is a vibrant...", image: "Manchester.png"}
]


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' ,
                                    courseList: courseList,
                                    cityList: cityList,
                                    ageList: ageList,
                                    carousel_elements: carousel_elements});
});

module.exports = router;
