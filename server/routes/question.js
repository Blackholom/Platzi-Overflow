import express from 'express'

const app = express.Router()

const currentUser = {
  firstName: 'Kevin',
  lastName: 'Gaviria',
  email: 'kgaviria@tiqal.com',
  password: '123456'
}

function questionMiddleware(req, res, next) {
  const { id } = req.params
  req.question = questions.find(question => question._id === +id)
  next()
}

function userMiddleware(req, res, next) {
  req.user = currentUser
  next()
}

const question = {
  _id: 1,
  title: '¿Para que sirve Android?',
  description: 'Miren esta es mi pregunta...',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Kevin',
    lastName: 'Gaviria',
    email: 'kgaviria@tiqal.com',
    password: '123456'
  }
}

const questions = new Array(10).fill(question)

// GET /api/questions
app.get('/', (req, res) => res.status(200).json(questions))


// Timeout function
// app.get('/', (req, res) => {
//   setTimeout(() => {
//     res.status(200).json(questions)
//   }, 2000)
// })

// GTE /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question);
})

// POST /api/questions
app.post('/', userMiddleware, (req, res) => {
  const question = req.body
  question._id = +new Date()
  question.user = req.user
  question.createdAt = new Date()
  question.answers = []
  questions.push(question)
  res.status(201).json(question)
})

app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
  const answer = req.body
  const q = req.question
  answer.createdAt = new Date()
  answer.user = req.user
  q.answers.push(answer)
  res.status(201).json(answer)
})

export default app
