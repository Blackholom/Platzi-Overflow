import express from 'express'

const app = express.Router()

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
app.get('/:id', (req, res) => {
  const { id } = req.params
  const q = questions.find(question => question._id === +id)
  res.status(200).json(q);
})

// POST /api/questions
app.post('/', (req, res) => {
  const question = req.body
  question._id = +new Date()
  question.user = {
    email: 'kgaviria@tiqal.com',
    password: '123456',
    firstName: 'Kevin',
    lastName: 'Gaviria',
  }
  question.createdAt = new Date()
  question.answers = []
  questions.push(question)
  res.status(201).json(question)
})

export default app
