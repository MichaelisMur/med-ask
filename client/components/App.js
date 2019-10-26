import React from 'react'
import InsuranceType from './InsuranceType'
import PolisCompany from './PolisCompany'
import ChooseServices from './ChooseServices'
import ChosenServices from './ChosenServices'

export default class App extends React.Component{
    constructor(){
        super()
        this.state = {
            currentType: "ОМС",
            currentCompany: "",
            typesList: ["ОМС", "ДМС"],
            companiesList: ["СК Рандеву", "СК МЕД-АСКЕР", "Страх-трах"],
            chosenServices: [],
            servicesList: [
                "Первичный приём врача-стоматолога терапевта",
                "Полирование челюсти",
                "Снятие камней с 1 зуба",
                "Рентген верхней и нижней челюстей",
                "МРТ грудной клетки",
                "МРТ челюсти",
                "Рентген грудной клетки",
                "Исследование функции внешнего дыхания",
                "Денситометрия",
                "МРТ головного мозга"
            ],
            polisNumber: "",
            closeCurtain: false,
            dateEnd: "",
            tel: "",
            notFound: false,
            havesent: false
        }
        this.changeType = this.changeType.bind(this)
        this.changeCompany = this.changeCompany.bind(this)
        this.addService = this.addService.bind(this)
        this.removeService = this.removeService.bind(this)
        this.fetch = this.fetch.bind(this)
        this.polisCurtains = this.polisCurtains.bind(this)
    }
    render(){

        if(this.state.notFound) return(
            <div className="main">
                <div style={{height: "140px"}}></div>
                <div
                    className="notfound"
                    onClick={()=>{window.location.reload(false)}}
                >
                    <div className="notfoundTitle">Полис с таким номером не обнаружен</div>
                    <div>Попробовать изменить данные</div>
                    <div className="notfoundButton">Ок</div>
                </div>
            </div>
        )

        return(
            <div className="main">
            <div style={{height: "60px"}}></div>
                <div className="form">
                    <div className="title">
                        Проверка услуг медицинского страхования
                    </div>
                    <InsuranceType
                        typesList={this.state.typesList}
                        currentType={this.state.currentType}
                        changeType={this.changeType}
                    />
                    <div className="polisInfo">
                        <div className="polisNumber">
                            <input placeholder="Введите номер полиса"
                                onChange={(e)=>{
                                    this.setState({
                                        polisNumber: e.target.value
                                    }, ()=>{
                                        this.checkPolisFormat(this.state.polisNumber)
                                    })
                                }}
                                value={this.state.polisNumber}
                            />
                            <div className="polisDate">
                                {this.state.dateEnd ? "Дата окончания " + this.state.dateEnd : ""}
                            </div>
                        </div>

                        <div className="curtainPolis"
                            style={{
                                display: this.state.polisCurtains ? "block" : "none"
                            }}
                            onClick={()=>{
                                this.setState({closeCurtain: true, polisCurtains: false}, ()=>{
                                    this.setState({closeCurtain: false})
                                })
                            }}
                        ></div>

                        <PolisCompany
                            companiesList={this.state.companiesList}
                            currentCompany={this.state.currentCompany}
                            changeCompany={this.changeCompany}
                            polisCurtains={this.polisCurtains}
                            closeCurtain={this.state.closeCurtain}
                            tel={this.state.tel}
                        />
                    </div>

                    <div className="services">
                        <div className="servicesLabel">Выберите медицинские услуги</div>
                        <ChooseServices
                            servicesList={this.state.servicesList}
                            addService={this.addService}
                            chosenServices={this.state.chosenServices}
                        />
                    </div>
                    <ChosenServices
                        chosenServices={this.state.chosenServices}
                        removeService={this.removeService}
                    />
                    
                    <div className="checkButton"
                        style={this.state.currentCompany && this.state.chosenServices.length ? {
                            background: this.state.havesent ? "lightgray" : "#ed462f",
                            color: "white",
                            border: this.state.havesent ? "1px solid lightgray" : "1px solid #ed462f"
                        } : {
                            background: this.state.havesent ? "lightgray" : "white",
                            color:  this.state.havesent ? "white" : "#ed462f",
                            border: this.state.havesent ? "1px solid lightgray" : "1px solid #ed462f"
                        }}
                        onClick={this.fetch}
                    >
                        {this.state.havesent ? "Новый запрос" : "Проверить"}
                    </div>
                </div>
            </div>
        )
    }
    fetch(){
        if(this.state.havesent) return window.location.reload(false)
        if(!this.state.currentCompany || !this.state.chosenServices.length || !this.state.polisNumber) return
        fetch("/api", {
            method: "POST",
            body: JSON.stringify({
                polis_ltd_type: this.state.currentType,
                polis_ltd_sk: this.state.currentCompany,
                chosenServices: this.state.chosenServices,
                polis_ltd_id: this.state.polisNumber
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(response=>{
            if(response.response == "error") return this.setState({notFound: true})
            this.setState(prevState=>{
                let services = prevState.chosenServices.slice()
                let final = []
                services.forEach(el=>{
                    let one = response.polis_ltd_inservice.find(elem=>(
                        elem == el.title
                    ))
                    let two = response.polis_ltd_notservice.find(elem=>(
                        elem == el.title
                    ))
                    let three = response.polis_ltd_notfoundservice.find(elem=>(
                        elem == el.title
                    ))
                    final.push({
                        title: el.title,
                        status: one ? "polis_ltd_inservice" : (two ? "polis_ltd_notservice" : "polis_ltd_notfoundservice")
                    })
                })
                return {
                    dateEnd: response.polis_ltd_date_end,
                    tel: response.polis_ltd_tel,
                    chosenServices: final,
                    havesent: true
                }
            })
        })
    }
    polisCurtains(k){
        this.setState({polisCurtains: k})
    }
    changeType(newType){
        this.setState({
            currentType: newType
        })
    }
    changeCompany(newCompany){
        this.setState({
            currentCompany: newCompany
        })
    }
    addService(service){
        this.setState(prevState=>{
            let tempChosen = prevState.chosenServices
            tempChosen.push({
                title: service,
                status: "initial"
            })
            return(
                {
                    chosenServices: tempChosen
                }
            )
        })
    }
    removeService(service){
        this.setState(prevState=>{
            let tempChosen = prevState.chosenServices
            tempChosen.splice(tempChosen.map((e)=>(e.title)).indexOf(service), 1)
            return(
                {
                    chosenServices: tempChosen
                }
            )
        })
    }
    checkPolisFormat(polis){
        if(polis.length === 13 && polis.match("\\d{4} \\d{8}")){
            return this.setState({
                currentType: "ДМС",
                currentCompany: "СК МЕД-АСКЕР"
            })
        }
        if(polis.length === 11 && polis.match("\\d{4} \\d{6}")){
            return this.setState({
                currentType: "ОМС",
                currentCompany: "СК МЕД-АСКЕР"
            })
        }
        if(polis.length === 14 && polis.match("\\d{4}-\\d{6}-\\d{2}")){
            return this.setState({
                currentType: "ДМС",
                currentCompany: "СК Рандеву"
            })
        }
        if(polis.length === 13 && polis.match("\\d{2}-\\d{2} \\d{4}-\\d{2}")){
            return this.setState({
                currentType: "ОМС",
                currentCompany: "СК Рандеву"
            })
        }
        if(polis.length === 14 && polis.match("\\d{2}-\\d{6}-\\d{4}")){
            return this.setState({
                currentType: "ДМС",
                currentCompany: "Страх-трах"
            })
        }
        if(polis.length === 11 && polis.match("\\d{4}-\\d{6}")){
            return this.setState({
                currentType: "ОМС",
                currentCompany: "Страх-трах"
            })
        }
        return this.setState({
            currentType: "ОМС",
            currentCompany: ""
        })
    }
}