const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('password needed as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://MarjaKo:${password}@cluster0-hxjyw.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true})
mongoose.connection.on('error', err => {
    console.log(err)
    throw 'failed to connect to MongoDB'
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (person.name !== undefined && person.number !==undefined) {
     person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
     })
} else {
    Person.find({}).then(result => {
    console.log('Puhelinluettelo:')
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close();
})}