require('dotenv').config()
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/posts')
const express = require('express')
const cors = require('cors')


const {PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()
app.use(cors())
app.use(express.json())
User.hasMany(Post)
Post.belongsTo(User)

app.post('/register', register)
app.post('/login', login)
// app.post('/logout', logout)


app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

sequelize.sync({force : true})
.then(() => {
    app.listen(4005, () => console.log(`db sync successful & server running on port ${4005}`))
})
.catch(err => console.log(err))

// app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))