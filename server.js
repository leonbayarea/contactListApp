var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('students',['schoolGrade']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
/*	var personList =[
		{name:'Roxxanne London',email:'Roxxane@gmail.com', phone:'111-111-1111'},
		{name:'Abajalie Johnson',email:'Abajalie @gmail.com', phone:'222-222-2222'},
		{name:'Jane Darling', email:'Jane@gmail.com', phone:'333-333-3333'}];*/
	db.schoolGrade.find({assignment:'exam'}, function(err, docs){
		res.json(docs);
	});
});

app.post('/contactList', function(req, res){
	// console.log(req.body);
	db.schoolGrade.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactList/:id', function(req, res){
	console.log(req.params.id);
	db.schoolGrade.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactList/:id', function(req, res){
	db.schoolGrade.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id+", "+req.body.student +", "+ req.body.grade+","+req.body.assignment);
	db.schoolGrade.findAndModify({query:{_id:mongojs.ObjectId(id)},update:{$set:
		{student:req.body.student, grade:req.body.grade, assignment:req.body.assignment}},
		new:true},function(err, doc){
			console.log("doc==="+JSON.stringify(doc));
			res.json(doc);
		});

});

app.listen(3000);
console.log("Server is running on port 3000");


