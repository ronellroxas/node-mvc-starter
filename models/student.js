const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/studentsdb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const studentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "No name provided"] },
    id: { type: String, required: [true, "No ID number provided"] },
    img: { type: String, required: true }
  }
);

const studentModel = mongoose.model('students', studentSchema);

module.exports = {
  getAll: function(sort, next) {
      studentModel.find({}).sort({ name: 1 }).exec(function(err, result) {
      var studentObjects = [];

        result.forEach(function(doc) {
          studentObjects.push(doc.toObject());
        });

      next(studentObjects);
    });
  },
  create: function(name, id, img) {
    var student = new studentModel({
      name: name,
      id: id,
      img: img
    });

    return student;
  },
  add: function(student, next) {
    student.save(function(err, student) {
      var result;
  
      if (err) {
        console.log(err.errors);
  
        result = { success: false, message: "Student was not created!" }
        res.send(result);
      } else {
        console.log("Successfully added student!");
        console.log(student);
  
        result = { success: true, message: "Student created!" }
  
        next(result);
      }
    });
  },
  query: function(query, next) {
    studentModel.find(query, function(err, students) {
      if(err) throw err;
      next(students);
    });
  },
  update: function(query, update, next) {
    studentModel.findOneAndUpdate(query, update, { new: true }, function(err, user) {
      if (err) throw err;
      console.log(user);
      next(user);
    });
  }
}