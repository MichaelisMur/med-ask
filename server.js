const   bodyParser  = require("body-parser"),
        express     = require("express"),
        path        = require("path"),
        app         = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const SK_MED_ASK = require("./DATABASES/SK_MED_ASK.json")
const SK_RANDEVU = require("./DATABASES/SK_RANDEVU.json")
const SK_STRAH = require("./DATABASES/SK_STRAH.json")
const SERVICES = require("./DATABASES/SERVICES.json")


app.use("/public", express.static(path.join(__dirname, 'public')));

const checkServices = (list) => {
    
    let result = {
        polis_ltd_inservice: [],
        polis_ltd_notservice: [],
        polis_ltd_notfoundservice: []
    }
    for(i = 0; i<list.length; i++){
        let temp = SERVICES.services.find(element=>(list[i].title == element.title))
        if(!temp) continue
        result[temp.status].push(list[i].title)
    }
    return result
}

app.post("/", (req ,res)=>{
    if(req.body.polis_ltd_sk == "СК МЕД-АСКЕР"){
        SK_MED_ASK.polis.forEach(el=>{
            if(el.polis_ltd_id == req.body.polis_ltd_id && el.polis_ltd_type == req.body.polis_ltd_type){
                res.send({...{
                    response: "OK",
                    polis_ltd_date_end: el.polis_ltd_date_end,
                    polis_ltd_tel: el.polis_ltd_tel
                }, ...checkServices(req.body.chosenServices)})
            }
        })
        return res.send({
            response: "error"
        })
    } else if (req.body.polis_ltd_sk == "СК Рандеву"){
        SK_RANDEVU.polis.forEach(el=>{
            if(el.polis_ltd_id == req.body.polis_ltd_id && el.polis_ltd_type == req.body.polis_ltd_type){
                res.send({...{
                    response: "OK",
                    polis_ltd_date_end: el.polis_ltd_date_end,
                    polis_ltd_tel: el.polis_ltd_tel
                }, ...checkServices(req.body.chosenServices)})
            }
        })
        return res.send({
            response: "error"
        })
    } else if (req.body.polis_ltd_sk == "Страх-трах"){
        SK_STRAH.polis.forEach(el=>{
            if(el.polis_ltd_id == req.body.polis_ltd_id && el.polis_ltd_type == req.body.polis_ltd_type){
                res.send({...{
                    response: "OK",
                    polis_ltd_date_end: el.polis_ltd_date_end,
                    polis_ltd_tel: el.polis_ltd_tel
                }, ...checkServices(req.body.chosenServices)})
            }
        })
        return res.send({
            response: "error"
        })
    }
})

app.listen(3001)