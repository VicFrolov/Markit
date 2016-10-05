module.exports = {
     entry: {
     	app: ['./src/firebase-auth.js', './src/navbar-login']
     },
     output: {
         path: './bin',
         filename: 'index.bundle.js'
     }
 };