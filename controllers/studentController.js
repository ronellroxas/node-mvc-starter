const studentModel = require('../models/student');

module.exports = {
    getAllStudents: function(req, res) {
        studentModel.getAll({name : 1}, function(students) {
            res.render('students', { title: 'Students', students: students });
        });
    },
    addStudent: function(req, res) {
        var student = studentModel.create(req.body.name, req.body.id, 'img/' + req.body.gender + '.png');
        studentModel.add(student, function(result) {
            res.send(result);
        })
    },
    search: function(req, res) {
        var pattern = "^" + req.body.name;
    
        studentModel.query({name: {$regex : pattern}}, function(students) {
            console.log(students);
            res.send(students);
        });
    },
    update: function(req, res) {
        var query = {
            name: req.body.name
        };
        
        var update = {
            $set: { id: '109' }
        };

        studentModel.update(query, update, function(result) {
            res.send(result);
        });
    }
}