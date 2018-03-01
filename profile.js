var sample_user = {
  "profile": {
    "profilepic": "assets/images/profilepic.jpg",
    "fname": "Jason",
    "lname": "Kwak",
    "street": "1234 abc st",
    "city": "cityname",
    "state": "CA",
    "zip": 12345,
    "phone": "1234567890",
    "email": "email@email.com",
    "birthday": "1990-09-09",
    "regionalclient": "Not Sure",
    "rehabclient": "Yes",
    "conditions": ["Autism", "Cerebral Palsy", "Intellectual Disability", "Epilepsy", "Developmental Disability"],
    "support": {
      "name": "Jason Kwak",
      "email": "email@email.com",
      "phone": "1234567890"
    }
  },
  "experience": [
    {
      "title": "CEO",
      "company": "Petco Inc.",
      "from": 2008,
      "to": 2018,
      "currently": true,
      "description": "Managed workers and watched pets."
    }
  ],
  "education": [{
      "school": "ABC School",
      "degree": "Some diploma",
      "description": "Describe your experience at school, what you learned, what useful skills you have acquired etc."
    }, {
      "school": "XYZ School",
      "degree": "Some diploma",
      "description": "Describe your experience at school, what you learned, what useful skills you have acquired etc."
    }
  ],
  "skills": [
    "skill1", "skill2", "skill3", "skill4", "skill5"
  ],
  "interest": {
    "career_interest": [
      "Legal", "Vetrinary", "Education"
    ],
    "personal_interest": [
      "interest1", "interest2", "interest3", "interest4", "interest5"
    ]
  },
  "availability": {
    "days": ["Sunday", "Monday", "Tuesday", "Friday"],
    "times": ["Morning", "Evening"],
    "hours": 30
  },
  "transportation": {
    "methods": ["Car", "Bike"],
    "other": "other method",
    "distance": 15
  },
  "portfolio": [
    {
      "title": "Canadian Wanderlust",
      "url": "https://www.canadianwanderlust.com",
      "thumbnail": "canadian-wanderlust.jpg",
      "description":"My Travel Blog for my post-university travels"
    },
    {
      "title":"Fury Fighting Gear",
      "url":"http://www.timbakerdev.com",
      "thumbnail":"fury-fighting-gear.jpg",
      "description":"(offline now) A fighting gear company I started"
    },
    {
      "title":"Original Thai Food",
      "url":"http://www.timbakerdev.com/originalthaifood.github.io",
      "thumbnail":"original-thai-food.jpg",
      "description":"Website I built for a restaurant I like in Thailand"
    },
    {
      "title":"Resume Website",
      "url":"http://www.timbakerdev.com",
      "thumbnail":"resume-website.jpg",
      "description":"A React based resume website template"
    },
    {
      "title":"Smirkspace",
      "url":"http://www.smirkspace.com",
      "thumbnail":"smirkspace.jpg",
      "description":"(MVP Only) A React and Meteor based chat University project."
    }
  ]
}
var profile = sample_user.profile;
var experience = sample_user.experience;
var education = sample_user.education;
var skills = sample_user.skills;
var interest = sample_user.interest;
var availability = sample_user.availability;
var transportation = sample_user.transportation;
var portfolio = sample_user.portfolio;

module.exports.sample_user = sample_user;
module.exports.profile = profile;
module.exports.experience = experience;
module.exports.education = education;
module.exports.skills = skills;
module.exports.interest = interest;
module.exports.availability = availability;
module.exports.transportation = transportation;
module.exports.portfolio = portfolio;