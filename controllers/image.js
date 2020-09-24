
const clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'c393e052f2e04623b28eacc298586b6c',
});

const handleApiCall = (req, res) => {
//.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)\
  app.models
 .predict(Clarifai.DEMOGRAPHICS_DETECT_MODEL, req.body.input)
 .then(data => {
    res.json(data);
 })
 .catch(err => {
    console.log(err)
   res.status(400).json('unable to work with api')
 })
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        	res.json(entries[0]);
        })
    .catch((err) => {
    	res.status(400).json('unable to get entries')
    })
}

module.exports = {
   handleImage,
   handleApiCall
}