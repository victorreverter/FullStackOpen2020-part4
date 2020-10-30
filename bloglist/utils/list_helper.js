const dummy = (blogs) => {
  return 1
}

const total_likes = (blogs) => {
    const total = blogs.map(blog => blog.likes).reduce((sum, curr) => sum + curr)

    return total
}

module.exports = {
  dummy,
  total_likes
}