const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => {
    return blog.likes + total
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let favBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favBlog.likes) {
      favBlog = blog
    }
  });

  return favBlog
}

const mostBlogs = (blogs) => {
  let most = {
    'author': null,
    'blogs': 0
  }
  blogs.forEach(blog => {
    const count = blogs.reduce((total, cur) => {
      return blog.author === cur.author ? ++total : total
    }, 0)
    if (count > most.blogs) {
      most.author = blog.author
      most.blogs = count
    }
  })
  
  return most
}

const mostLikes = (blogs) => {
  let most = {
    'author': null,
    'likes': 0
  }
  blogs.forEach(blog => {
    const count = blogs.reduce((total, cur) => {
      return blog.author === cur.author ? total += cur.likes : total
    }, 0)
    if (count > most.likes) {
      most.author = blog.author
      most.likes = count
    }
  })
  
  return most
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
  listWithOneBlog
}