module.exports = {
     entry: {
        app: [  
            './src/firebase-auth.js', 
            './src/navbar-login', 
            './src/new-post.js',
            './src/find.js'
        ]
     },
     output: {
         path: './bin',
         filename: 'index.bundle.js'
     }
 };