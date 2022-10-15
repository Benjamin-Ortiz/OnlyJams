const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js')
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js')
const playlistsRouter = require('./playlists.js')
const commentsRouter = require('./comments.js')





// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);


// //? Testers
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter)
router.use('/playlists', playlistsRouter)




module.exports = router;
