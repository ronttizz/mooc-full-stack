const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://toninissinen_db_user:${password}@cluster0.xunuwbe.mongodb.net/testNotesApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
  {
    content: 'HTML is easy',
    important: true,
  },
  {
    content: 'CSS is hard',
    important: true,
  },
]

const saveNotes = async () => {
  try {
    const result = await Note.insertMany(notes)
    console.log(`Saved ${result.length} notes`)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
  }
}

saveNotes()

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
