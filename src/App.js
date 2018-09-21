import React, { Component } from 'react';
import OverviewContainer from './containers/OverviewContainer'
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import MonitorContainer from './containers/MonitorContainer'
import ReportsContainer from './containers/ReportsContainer'
import Tabs from './components/tabs'

const menuItems = ["Overview", "Monitors", "Reports"]

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Row> <Col sm='12'><h2>Workspaces </h2></Col></Row>
          <Row>
            <Col sm='12'>
              <Tabs
                tabItems={menuItems}
                toggle={this.toggle}
                activeTab={this.state.activeTab}
              />
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={0}>
                  <OverviewContainer />
                </TabPane>
                <TabPane tabId={1}>
                  <MonitorContainer />
                </TabPane>
                <TabPane tabId={2}>
                  <ReportsContainer />
                </TabPane>
              </TabContent>
            </Col>
          </Row>

        </Container>
      </div>
    )

  }

}

export default App;
