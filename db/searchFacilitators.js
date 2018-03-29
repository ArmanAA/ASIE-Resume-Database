let Sequelize = require("sequelize"),
  db = require("./db"),
  Facilitators = require("./Model/Facilitators").Facilitators,
  Interest = require("./Model/Interest").Interest,
  Candidate = require("./Model/Candidate").Candidate,
  User = require('./Model/User').User;


const Op = Sequelize.Op;


let fillData = (req, res) =>{
  let query = {
    include: [
      {
        model:User,
        attributes: ['firstName', 'lastName', 'email']
      }]
  }
  Facilitators.findAll(query).then((response)=> {
   // console.log(response);
    
     let facilitator_results = [];
    if (response) {
      facilitator_results = response.map(result => {
        return {
          id: result.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email
        };
      })
    }
    res.json(facilitator_results);
  });
}


let search =  (req, res)=> {
  //parse query (trim, blankspaces)

  let user = {
    model: Facilitators,
    include: [{
      model:User
    }]
  };

  let query = {
  
     include: [
             {model: User,
              attributes: ['firstName', 'lastName', 'id', 'email'],
              where: {
                  firstName: {
                    [Op.like] : `%${req.query.firstName}%`
                  },
                  lastName:{
                    [Op.like] : `%${req.query.lastName}%`
                  },
                  email:{
                    [Op.like] : `%${req.query.email}%`
                  }

                }
              }
           ]
    }
   
  console.log('QUERY',query);
  Facilitators.findAll(query).then((response)=>{
   
     let facilitator_results = [];
    if (response) {
      facilitator_results = response.map(result => {
        return {
          id: result.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email
        };
      })
    }
   
    res.json(facilitator_results);
  });
}


exports.search = search;
exports.fillData = fillData;