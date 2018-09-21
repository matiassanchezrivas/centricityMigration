import React from 'react';
import './hexagonsContent.css'

import {
    Card,
    Button, Col, Row, CardBody, ButtonGroup
} from 'reactstrap';

var hexagonsPrueba = [];
for (var i = 0; i < 100; i++) {
    hexagonsPrueba.push(parseInt(Math.random() * 8));
}

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
    margin: {
        margin: "5px"
    },
    colorHex0: {
        backgroundColor: "#69c4a6"
    },
    colorHex1: {
        backgroundColor: "#f8e185"
    },
    colorHex2: {
        backgroundColor: "#5288d1"
    },
    colorHex3: {
        backgroundColor: "#222"
    },
    colorHex4: {
        backgroundColor: "#789"
    },
    colorHex5: {
        backgroundColor: "#F59B00"
    },
    colorHex6: {
        backgroundColor: "#c61d6a"
    },
    colorHex7: {
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
        //const { } = props
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>

                                <Row>
                                    <Col xs='9'>
                                        {(this.state.rSelected === 0) ? awsStates.map((state, i) => {
                                            return (<div key={i} style={Styles.margin}>
                                                <div style={{ ...Styles.hexagono, ...Styles["colorHex" + i] }}></div>
                                                <li key={i} style={Styles.li} >{state}</li>
                                                {/* /* class={`legend legend-aws-${i + 1}`} */}
                                            </div>
                                            )
                                        }) : null}

                                        {(this.state.rSelected === 1) ? liquidwareStates.map((state, i) => {
                                            return (<div style={Styles.margin}>
                                                <div style={{ ...Styles.hexagono, ...Styles["colorLw" + i] }}></div>
                                                <li key={i} style={Styles.li} >{state}</li>
                                                {/* /* class={`legend legend-aws-${i + 1}`} */}
                                            </div>
                                            )
                                        }) : null}
                                    </Col>
                                    <Col xs='3'>
                                        <ButtonGroup>
                                            <Button onClick={() => this.onRadioBtnClick(0)} active={this.state.rSelected === 0} >AWS</Button>
                                            <Button onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Liquidware</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        {
                            hexagonsPrueba.map((hex) => {
                                return (
                                    // <li class="hexagon-item" data-status="STOPPED">
                                    //     <div class="tooltip-hex">
                                    //     </div>
                                    // </li>
                                    // <li>
                                    //     <div style={{ ...Styles.hexagono, ...Styles["colorHex" + hex] }}></div>
                                    // </li>
                                    null
                                )
                            })
                        } }
                    </Col>
                </Row>
            </div>
        )

        // return (
        //     <div className={null}>
        //         <div id="hexagons" class="hexagons">
        //             <div class="hexagons__legend">
        //                 <div ng-if="workspacesQualify == 'aws'">
        //                     <div class="legend legend-aws-1">Available</div>
        //                     <div class="legend legend-aws-2">Starting</div>
        //                     <div class="legend legend-aws-3">Pending</div>
        //                     <div class="legend legend-aws-4">Stopped</div>
        //                     <div class="legend legend-aws-5">Stopping</div>
        //                     <div class="legend legend-aws-6">Terminating</div>
        //                     <div class="legend legend-aws-7">Unhealthy</div>
        //                     <div class="legend legend-aws-8">Logged</div>
        //                 </div>
        //                 {/* <div ng-if="workspacesQualify == 'lw'">
        //                     <div class="legend legend-lw-1">A+</div>
        //                     <div class="legend legend-lw-2">A</div>
        //                     <div class="legend legend-lw-3">A-</div>
        //                     <div class="legend legend-lw-4">B+</div>
        //                     <div class="legend legend-lw-5">B-</div>
        //                     <div class="legend legend-lw-6">C</div>
        //                     <div class="legend legend-lw-7">N/A</div>
        //                 </div> */}
        //                 <div class="toggle-qualify">
        //                     <div class="btn-bar">
        //                         <div class="btn-bar__item" ng-class="{'btn-bar__item--active': workspacesQualify == 'aws'}" ng-click="changeQualify('aws')">AWS</div>
        //                         <div class="btn-bar__item" ng-class="{'btn-bar__item--active': workspacesQualify == 'lw'}"
        //                             ng-click="changeQualify('lw')">Liquidware</div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );

    }

}


export default hexagonsContent;

