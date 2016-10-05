module.exports = {
     entry: {
     	app: ['./src/firebase-auth.js', './src/navbar-login', './src/find.js']
     },
     output: {
         path: './bin',
         filename: 'index.bundle.js'
     }
 };