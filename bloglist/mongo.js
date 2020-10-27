const mongoose = require('mongoose')

const password = process.argv[2]
const newTitle = process.argv[3]
const newAuthor = process.argv[4]
const newUrl = process.argv[5]
const newLikes = process.argv[6]

const url = `mongodb+srv://qbanor:${password}@cluster0.3fzty.mongodb.net/bloglist-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
  title: newTitle,
  author: newAuthor,
  url: newUrl,
  likes: newLikes
})

const Blog = mongoose.model('Blog',  blogSchema)

const saveBlog = (title, author, url, likes) => {
  const blog = new Blog({
    title,
    author,
    url,
    likes
  })

  blog.save().then((result) => {
    console.log(`added ${result.title} by ${result.author} to bloglist`)
    mongoose.connection.close()
  })
}

const listAll = () => {
  Blog.find({}).then((result) => {
    console.log('bloglist:')
    result.forEach((blog) => {
      console.log(`${blog.title} ${blog.author}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
} else if (process.argv.length === 3) {
  listAll()
} else if (process.argv.length === 5) {
  saveBlog(newTitle, newAuthor, newUrl, newLikes)
}
