const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");

// Add body-parser middleware
app.use(express.urlencoded({ extended: true }));

const data = {result:"20ft = hahahahcm",tabid:0,type:"length",filler:"ft, cm, m, km, in"};
const units = [{"ft":3.28, "cm":100, "m":1, "km":0.001, "in":39.37, "mm":1000, "yd":1.094, "mi":0.000621371},
    {"kg":1, "g":1000, "lb":2.20462, "oz":35.274, "mg":1000000},
    {"C":0, "F":32, "K":-273.15}
];

app.get("/", (req,res)=>{
    res.render("index.ejs",data);
});
app.post("/id",(req,res)=>{
    data.result = "20ft = hahahahcm";
    data.tabid = req.body.tab;
    data.type = (data.tabid==0?"length":(data.tabid==1?"weight":"temperature"));
    data.filler = (data.tabid==0?"ft, cm, m, km, in, mm, yd, mi":(data.tabid==1?"kg, g, lb, oz, mg":"C, F, K"));
    res.redirect("/");
});

app.post("/convert",(req,res)=>{
    let { unitfrom, value,unitto } = req.body;
    unitfrom = unitfrom.trim();
    unitto = unitto.trim();
    value = parseFloat(value);
    if(isNaN(value)){
        data.result = "Invalid value entered. Please enter a numeric value.";
        return res.redirect("/");
    }
    if(data.tabid==2&&unitfrom=="F"){
        value = (value-32)*5/9;
        unitfrom = "C";
        if(unitto=="K"){
            value += 273.15;
            unitfrom = "K";
            data.result=`${req.body.value}F = ${value}${unitfrom}`;
        }
        else if(unitto=="C"){
            data.result=`${req.body.value}F = ${value}${unitfrom}`;
        }
    }
    else if(data.tabid==2&&unitfrom=="K"){
        if(unitto=="F"){
            value = (value-273.15)*9/5+32;
            unitfrom = "F";
        }
        else if(unitto=="C"){
            value -= 273.15;
            unitfrom = "C";
        }
        data.result=`${req.body.value}K = ${value}${unitfrom}`;
    }
    else if(data.tabid==2&&unitfrom=="C"){
        if(unitto=="F"){
            data.result=`${req.body.value}C = ${(value*9/5)+32}F`;
        }
        else if(unitto=="K"){
            data.result=`${req.body.value}C = ${value+273.15}K`;
        }
    }
    else if(data.tabid==2){
        data.result = "Invalid temperature unit. Please enter C, F, or K.";
    }
    else{
        data.result=`${value}${unitfrom} = ${(value*units[data.tabid][unitto]/units[data.tabid][unitfrom]).toFixed(2)}${unitto}`;
    res.redirect("/");
}});

app.post("/reset",(req,res)=>{
    data.result = "";
    data.tabid = 0;
    data.type = "length";
    res.redirect("/");
});

app.listen(3000, () => {
  console.log("Unit Converter app is running on port 3000");
});