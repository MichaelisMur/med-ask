import React from 'react'

export default class ChooseServices extends React.Component{
    constructor(){
        super()
        this.state = {
            opened: false
        }
    }
    render(){
        return(
            <div className="chosenServices">
                {this.props.chosenServices.map((el, key)=>(
                    <div key={key}>
                        <div className="chosenServiceStatus"
                            id={el.title}
                            onClick={(e)=>{
                                this.props.removeService(e.target.children[0].innerText)
                            }}
                            style={{
                                backgroundImage: `url(${this.switch(el.status)})`
                            }}
                        >
                            <span>{el.title}</span>
                        </div>
                        {el.title}
                    </div>
                ))}
            </div>
        )
    }
    switch(status){
        switch(status){
            case "initial": return "/public/cross.png"
            case "polis_ltd_inservice": return "/public/tick.png"
            case "polis_ltd_notservice": return "/public/q.png"
            case "polis_ltd_notfoundservice": return "/public/nf.png"
        }
    }
}