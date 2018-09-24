import React from 'react';
import './hexagonsContent.css'

import {
    Card,
    Button, Col, Row, CardBody, ButtonGroup
} from 'reactstrap';

// var hexagonsPrueba = [];
// for (var i = 0; i < 10000; i++) {
//     hexagonsPrueba.push(parseInt(Math.random() * 8));
// }

var awsStates = ["Available", "Starting", "Pending", "Stopped", "Stopping", "Terminating", "Unhealthy", "Logged"]
var liquidwareStates = ["A+", "A", "A-", "B+", "B-", "C", "N/A"]

var Styles = {

    li: {
        listStyleType: 'none',
        paddingTop: "5px",
        paddingRight: "10px",
        paddingLeft: "32px"

    },
    card: {
        margin: "10px"
    },
    hexagono: {
        display: "block",
        position: "absolute",
        width: "32px",
        height: "32px",
        backgroundColor: "#A9D3EA",
        clipPath: "polygon(50% 0,93.3% 25%,93.3% 75%,50% 100%,6.7% 75%,6.7% 25%)",
        WebkitClipPath: "polygon(50% 0,93.3% 25%,93.3% 75%,50% 100%,6.7% 75%,6.7% 25%)"
    },
    hexagonoMuestra: {

        display: "block",
        position: "absolute",
        width: "32px",
        height: "32px",
        backgroundColor: "#A9D3EA",
        clipPath: "polygon(50% 0,93.3% 25%,93.3% 75%,50% 100%,6.7% 75%,6.7% 25%)",
        WebkitClipPath: "polygon(50% 0,93.3% 25%,93.3% 75%,50% 100%,6.7% 75%,6.7% 25%)"
    },
    margin: {
        margin: "10px",
    },
    hexagonColor_AVAILABLE: {
        backgroundColor: "#69c4a6"
    },
    hexagonColor_STARTING: {
        backgroundColor: "#f8e185"
    },
    hexagonColor_PENDING: {
        backgroundColor: "#5288d1"
    },
    hexagonColor_STOPPED: {
        backgroundColor: "#222"
    },
    hexagonColor_STOPPING: {
        backgroundColor: "#789"
    },
    hexagonColor_TERMINATING: {
        backgroundColor: "#F59B00"
    },
    hexagonColor_UNHEALTHY: {
        backgroundColor: "#c61d6a"
    },
    hexagonColor_LOGGED: {
        backgroundColor: "#32cd32"
    },

    colorLw0: {
        backgroundColor: "#239023"
    },
    colorLw1: {
        backgroundColor: "#32cd32"
    },
    colorLw2: {
        backgroundColor: "#84e184"
    },
    colorLw3: {
        backgroundColor: "#f8e185"
    },
    colorLw4: {
        backgroundColor: "#F59B00"
    },
    colorLw5: {
        backgroundColor: "#c61d6a"
    },
    colorLw6: {
        backgroundColor: "gray"
    },
    containerHexagono: {
        display: "block",
        width: "32px",
        height: "32px",
        //backgroundColor: 'red',
        nthChild: "2n"
    }
}

class hexagonsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rSelected: 0 }
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    render() {
        const { workspaces } = this.props
        return (
            <div>
                <Card>
                    <Row style={Styles.margin}>
                        {(this.state.rSelected === 0) ? awsStates.map((state, i) => {
                            return (<div key={i} style={Styles.margin}>
                                <div style={{ ...Styles.hexagono, ...Styles[`hexagonColor_${state.toUpperCase()}`] }}></div>
                                <li key={i} style={Styles.li} >{state}</li>
                                {/* /* class={`legend legend-aws-${i + 1}`} */}
                            </div>
                            )
                        }) : null}
                        {(this.state.rSelected === 1) ? liquidwareStates.map((state, i) => {
                            return (<div key={i} style={Styles.margin}>
                                <div style={{ ...Styles.hexagono, ...Styles["colorLw" + i] }}></div>
                                <li key={i} style={Styles.li} >{state}</li>
                                {/* /* class={`legend legend-aws-${i + 1}`} */}
                            </div>
                            )
                        }) : null}
                        <ButtonGroup className="ml-auto" >
                            <Button onClick={() => this.onRadioBtnClick(0)} active={this.state.rSelected === 0} >AWS</Button>
                            <Button onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Liquidware</Button>
                        </ButtonGroup>

                    </Row>
                </Card>
                <Row style={Styles.margin}>
                    {
                        workspaces.map((workspace, i) => {
                            console.log(workspace)
                            return (
                                <div key={i} style={Styles.containerHexagono}>
                                    <div style={{ ...Styles.hexagonoMuestra, ...Styles[`hexagonColor_${workspace.state}`] }}></div>
                                </div>
                            )
                        })
                    }
                </Row>
            </div >
        )
    }
}


export default hexagonsContent;

