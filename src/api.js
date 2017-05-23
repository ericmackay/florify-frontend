import superagent from 'superagent'
import { API_HOST } from './config'

class Api {

  // For user login
  requestLogIn = (email, password) => {
    return superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
    .set('Accept', 'application/json')
  }

  // For user signup
  requestSignUp = (signUpObj) => {
    return superagent
    .post(`${API_HOST}/auth/users`)
    .send({
      email: signUpObj.email,
      phone: signUpObj.phone,
      password: signUpObj.password
    })
    .set('Accept', 'application/json')
  }

  // For user logout
  requestLogOut = (token) => {
    return superagent
    .delete(`${API_HOST}/auth/sessions`)
    .send({token})
    .set('Authorization', `token ${token}`)
    .set('Accept', 'application/json')
  }

  // Return the latest basic info on all plantes, match with endpoints
  getPlants = (token) => {
    return superagent
    .get(`${API_HOST}/plants`)
    .set('Authorization', `token ${localStorage.token}`)

  }

  // Return single plant card with 4 charts on the page, waiting for endpoints
  // id here is plant ID, not userId, figure out a way to access plantId
  // Can request a period of either "hour", "day", "week"
  getPlantDetail = (id, period) => {
    return superagent
    .get(`${API_HOST}/plants/${id}/${period}`)
    .set('Authorization', `token ${localStorage.token}`)
  }

  // For loggedin user to delete plant card
  deletePlant = (id) => {
    console.log(id, "Is id defined?????");
    return superagent
    .delete(`${API_HOST}/plants/${id}`)
    .set('Authorization', `token ${localStorage.token}`)
    .then(res => console.log('successful delete'))
    .catch(console.error)
  }

  // Get the loggedin user profile
  // getMe = (token) => {
  //    return superagent
  //    .get(`${API_HOST}/auth/me`)
  //    .send({token})
  //    .set('Authorization', `token ${token}`)
  //    .set('Accept', 'application/json')
  //    .then(profile => {
  //      return JSON.parse(profile.text);
  //    })
  //  }

   updatePlant = (plantData) => (
      superagent
      .patch(`${API_HOST}/plants/${plantData.id}`)
      .send(plantData)
      .set('Authorization', `token ${localStorage.token}`)
      .catch(err => console.error(err))
  )

  // For loggedin user to post a new plant card
  addPlant = (plant) => {
    //  return this.getMe(localStorage.token)
    //  .then((profile) => {
       return superagent
       .post(`${API_HOST}/plants`)
       .send({
         // Match with the sql table
         nickname: plant.nickname,
         name: plant.name,
         description: plant.description,
       })
       .set('Authorization', `token ${localStorage.token}`)
       .set('Accept', 'application/json')
    //  })
   }
}

export default new Api();
