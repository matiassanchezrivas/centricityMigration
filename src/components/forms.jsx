import React from 'react';
import {
    Form, FormGroup, Label, Input,
    Container, Row, Col,
} from 'reactstrap';
import Typeahead from './typeahead'

const liquidware = [
    { value: 'up_time_percent', text: "Uptime(%)" },
    { value: "login_delay_avg", text: "Login delay (s)" },
    { value: "non_responding_apps", text: "App not resp (qty)" },
    { value: "overall_ux_rating_avg", text: 'Avg loadtime apps (s)' },
];

const compare = [
    { text: '=', value: 'equals' },
    { text: ">", value: 'greater' },
    { text: ">=", value: 'greaterEqual' },
    { text: "<=", value: 'lessEqual' },
    { text: "<", value: 'less' }
];

const statuses = ["Available", "Starting", "Pending", "Stopped", "Stopping", "Terminating", "Unhealthy", "Logged"]


export default class Example extends React.Component {
    render() {
        const { tags = [], bundles = [], machineNames = [], userNames = [], IPs = [], selectedOnFilter, onChange } = this.props;
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Typeahead selected={selectedOnFilter.status} onChange={(value) => onChange("status", value)} options={statuses} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Health</Label>
                        <Input onChange={(e) => {
                            onChange("unhealthy", e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            <option value={'none'}>All</option>
                            <option value={false}>Healthy</option>
                            <option value={true}>Unhealthy</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Liquidware</Label>
                        <Row>
                            <Col xs="5">
                                <Input onChange={(event) => onChange("liquidwareMetric", event.target.value)} type="select">
                                    {
                                        liquidware.map((l, i) => {
                                            return <option value={l.value} key={i}>{l.text}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col xs="2">
                                <Input onChange={(event) => onChange("liquidwareMetric", event.target.value)} type="select">
                                    {
                                        compare.map((l, i) => {
                                            return <option value={l.value} key={i}>{l.text}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col xs="5">
                                <Input type="number" onChange={(event) => onChange("liquidwareValue", event.target.value)} value={selectedOnFilter.liquidwareValue} id="value" placeholder="Values" />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Label>Bundles</Label>
                        <Input onChange={(e) => {
                            onChange("bundles", e.target.value)
                        }} type="select" name="select" id="exampleSelect">
                            <option>All</option>
                            {
                                bundles.map((b, i) => {
                                    return <option key={i}>{b.bundleName}</option>
                                })
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Tags</Label>
                        <Row>
                            <Col xs="6">
                                <Input onChange={(event) => onChange("liquidwareMetric", event.target.value)} type="select">
                                    {
                                        tags.map((t, i) => {
                                            return <option key={i}>{t}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col xs="6">
                                <Input onChange={(event) => onChange("liquidwareValue", event.target.value)} value={selectedOnFilter.liquidwareValue} placeholder="Value" />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Label>Machine names</Label>
                        <Typeahead selected={selectedOnFilter.machineNames} onChange={(value) => onChange("machineNames", value)} options={machineNames} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>
                    <FormGroup>
                        <Label >Usernames</Label>
                        <Typeahead selected={selectedOnFilter.userNames} onChange={(value) => onChange("userNames", value)} options={userNames} multiple={true} placeholder="Type your statuses" />
                    </FormGroup>
                    <FormGroup>
                        <Label >IP Addresses</Label>
                        <Typeahead onChange={this.handleChangeUserNames} options={IPs} multiple={true} placeholder="Type the IPs" />
                    </FormGroup>
                    <FormGroup onChange={(e) => onChange("userConnected", e.target.value)} tag="fieldset">
                        <FormGroup check>
                            <Label check>
                                <Input checked={selectedOnFilter.userConnected === 'all'} value='all' type="radio" name="radio1" />{' '}
                                All
            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input checked={selectedOnFilter.userConnected === 'connected'} value='connected' type="radio" name="radio1" />{' '}
                                Connected
            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                            <Label check>
                                <Input checked={selectedOnFilter.userConnected === 'disconnected'} value='disconnected' type="radio" name="radio1" />{' '}
                                Disconnected
            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form >
            </Container >
        );
    }
}