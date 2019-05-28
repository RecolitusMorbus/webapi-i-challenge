// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message
      });
    });
});

server.post('/users', (req, res) => {
  const userInfo = req.body;
  db.users
    .insert(userInfo)
    .then(user => {
      res.status(201).json({
        success: true,
        user
      });
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message
      });
    });
});

// server.get('/users/:id', (req, res) => {
//   const id = req.params.id
//   db.users
//     .findById(id)
//     .then(user => {
//       if (user) {
//         res.status(200).json({
//           success: true,
//           id
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "Sorry, we couldn't find a user by that ID."
//         });
//       };
//     })
//     .catch(({ code, message }) => {
//       res.status(code).json({
//         success: false,
//         message
//       });
//     });
// });

server.listen(4000, () => {
  console.log('\n *** Server Running *** \n');
});