const express = require('express');
const app = express();
const port = 3000;
const formidable= require('express-formidable');
const fs = require('fs');

// app.get('/', (req, res) => {
//     res.send('Yay Node Girls')
// });

// app.get('/node', (req, res) => {
//     res.send('Yay We are Node Girls')
// });

// app.get('/girls', (req, res) => {
//     res.send('Yay We are Node Girls Girls')
// });
// fs.readFile(__dirname + '/data/posts.json', (error, file) => {
//     console.log(file.toString());
//     let parsedFile = JSON.parse(file);
// })

app.use(formidable());
app.post('/create-post', (req, res) => {
    fs.readFile(__dirname + '/data/posts.json', (error, file) => {
        console.log(file.toString());
        let parsedFile = JSON.parse(file)
        parsedFile[Date.now()] = req.fields.blogpost
        let parsedFileNew = JSON.stringify(parsedFile)
        fs.writeFile(__dirname + '/data/posts.json', parsedFileNew, (error) => {    
            if(error){
                console.log(error)
            } else {
                console.log('Added')
            }


        })
    })
});
app.get('/get-posts', (req, res) => {
    res.sendFile(__dirname + '/data/posts.json')
})

// function getBlogposts (url) {
//     fetch(url, {
//         method: 'GET'
//     })
//     .then(function (res) {
//         res.json()
//         .then(function (json) {
//             console.log(json);
//             addBlogpostsToPage(json);
//         });
//     })
//     .catch(function (err) {
//         console.error(err)
//     });
// }
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}. Ready to accept requests!`);
});