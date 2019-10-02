import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
// import { createStore, compose, applyMiddleware } from 'redux';
import Home from './component/Home';
import ListMember from './component/ListMember';
import AddMember from './component/AddMember';
// import rootReducer from './reducers';

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

import configureStore from './store';
const store = configureStore()

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router>
            <Layout>
              <Sider trigger={null} collapsed={false}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/list">
                      <span>List Member</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', paddingLeft: 16 }}>
                  Top 10 Idol K-Pop
              </Header>
                <Content
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                  }}
                >
                  <Route exact path="/" component={Home} />
                  <Route path="/list" component={ListMember} />
                  <Route path="/add" component={AddMember} />
                </Content>
              </Layout>
            </Layout>
          </Router>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
