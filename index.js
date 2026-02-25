const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");

// Add body-parser middleware
app.use(express.urlencoded({ extended: true }));

const data = {result:"20ft = hahahahcm",tabid:0,type:"length"};
const units = [["ft", "cm", "m", "km"],
    {type: "weight", units: ["kg", "g", "lb", "oz"]},
    {type: "temperature", units: ["C", "F", "K"]}
];

app.get("/", (req,res)=>{
    res.render("index.ejs",data);
});
app.post("/id",(req,res)=>{
    data.result = "20ft = hahahahcm";
    data.tabid = req.body.tab;
    data.type = (data.tabid==0?"length":(data.tabid==1?"weight":"temperature"));
    res.redirect("/");
});

app.post("/convert",(req,res)=>{
    const { unitfrom, value,unitto } = req.body;
    console.log(unitfrom, unitto, value);
    res.redirect("/");
});

app.listen(3000, () => {
  console.log("Unit Converter app is running on port 3000");
});