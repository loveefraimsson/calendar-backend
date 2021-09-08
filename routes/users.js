var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");

router.use(cors());


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile("toDoList.json", function(err, data) {
    if (err) {
      console.log(err);
    }

    let todo = JSON.parse(data);
    res.json(todo);

  });
});


router.post("/delete", function(req, res) {
  let title = req.body.title;
  console.log("Clicked todo: ", title);

  //let title = "Laga mat";
  

  fs.readFile("toDoList.json", function(err, data) {
    if(err) {
      console.log(err);
    }

    let list = JSON.parse(data)
    console.log("all list:", list);
    
    let findToDo = list.find((list) => list.title === title);
    console.log("findToDo", findToDo);
    
    findToDo.done = "true";

    console.log("list 2:", list);
    
    fs.writeFile("toDoList.json", JSON.stringify(list, null, 2), function() {
      if(err) {
        console.log(err);
      }

      res.json({list})
    })
    
    // res.send(list);
    
  })

})



router.post("/addToDo", function(req, res) {
  let incommingToDo = req.body;
  console.log("incommingToDo: ", incommingToDo);

    fs.readFile("toDoList.json", function(err, data) {
      if(err) {
        console.log(err);
      }

      let list = JSON.parse(data)
      console.log("all list:", list);
      
      let newToDo = {deadline: incommingToDo.theDeadline , title: incommingToDo.newToDo, done: incommingToDo.done};
      console.log("newToDo", newToDo);
      list.push(newToDo)
      console.log("newList", list);

      
      
      

      
      
      fs.writeFile("toDoList.json", JSON.stringify(list, null, 2), function() { 
        if(err) {
          console.log(err);
        }

        res.json({list})
      })
    
    //res.send(list);
    
  })


})

module.exports = router;
