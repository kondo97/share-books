const functions = require('firebase-functions');  
const { Nuxt } = require('nuxt');  
const nuxt = new Nuxt({  
   buildDir: 'ssr',  
   dev: false  
});  

exports.ssr = functions.https.onRequest(async (req, res) => {  
   await nuxt.ready()  
   return nuxt.render(req, res)  
}) 

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
