import React from 'react';
import {
    Form, FormGroup, Label, Input,
    Container, Row, Col,
} from 'reactstrap';
import Typeahead from './typeahead'

const liquidware = ["Uptime(%)", "Login delay (s)", "App not resp (qty)", "Avg loadtime apps (s)", "UX Score (A+, A, A-, B+, B-, C)"]
const compare = ['=', ">", ">=", "<=", "<"]
const statuses = ["Available", "Starting", "Pending", "Stopped", "Stopping", "Terminating", "Unhealthy", "Logged"]

export default class Example extends React.Component {
    render() {
        const { machineNames = [], userNames = [], IPs = [], selectedUserNames, selectedMachineNames, onChange } = this.props;
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Typeahead onChange={this.handleChangeUserNames} options={statuses} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Health</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>All</option>
                            <option>Healthy</option>
                            <option>Unhealthy</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Liquidware</Label>
                        <Row>
                            <Col xs="5">
                                <Input type="select" name="select" id="exampleSelect">
                                    {
                                        liquidware.map((l, i) => {
                                            return <option key={i}>{l}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col xs="2">
                                <Input type="select" name="select" id="exampleSelect">
                                    {
                                        compare.map((l, i) => {
                                            return <option key={i}>{l}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col xs="5">
                                <Input id="value" placeholder="Values" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label >Machine names</Label>
                        <Typeahead selected={selectedMachineNames} onChange={(value) => onChange("machineNames", value)} options={machineNames} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>
                    <FormGroup>
                        <Label >Usernames</Label>
                        <Typeahead selected={selectedUserNames} onChange={(value) => onChange("userNames", value)} options={userNames} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>
                    <FormGroup>
                        <Label >IP Addresses</Label>
                        <Typeahead onChange={this.handleChangeUserNames} options={IPs} multiple={true} placeholder="Type the IPs" />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                All
            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Connected
            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                            <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Disconnected
            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form >
            </Container >
        );
    }
}