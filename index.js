const Joi = require('joi')
const express = require('express');
const app = express();
// add the middleware 
app.use(express.json());

const courses = [
    {id: 1,title:"course1"},
    {id: 2,title:"course2"},
    {id: 3,title:"course3"},
    {id: 4,title:"course4"}
]

app.get("/", (req,res) => {
    res.send("Hello World")
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`no course found with id = ${req.params.id}`)
    res.send(course);
});

app.post("/api/courses", (req, res) => {

    //validate the inputs
    // if(!req.body.title || req.body.title.length <3) {
    //     res.status(400).send("Tile of the course is required and \
    //     should not be less than 3 characters long");
    //     return; 
    // }

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
        // 400 is bad request.
    const course = {
        id: courses.length+1,
        title: req.body.title
    }

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) =>{
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`no course found with id = ${req.params.id}`)
    res.send(course);

    //validate

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    // 400 is bad request.
    //Update the courses.
    course.title = req.body.title;
    res.send(course);

});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`no course found with id = ${req.params.id}`)
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course)

});

function validateCourse(course){
    const schema = Joi.object({
    title: Joi.string().min(3).required()

    });

   return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));


