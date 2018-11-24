import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImage, CardBody, CardTitle, CardText, CardFooter, Fa, Tooltip, Badge, Button } from 'mdbreact';
import './App.css';
import NavBarPage from './containers/header';
import SnowStorm from 'react-snowstorm';
import CarouselPage from './containers/slider';
import axios from 'axios';
//    <SnowStorm />
//import Chat from './chat';

class App extends Component {
  state = {
    posts: [],
    url: '',
    load: false,
  }

  handleChange = e => this.setState({url: e.target.value})
  sendUrl = () => {
    this.setState({load: true})
    const ref = this;
    axios.get('/api?url=' + this.state.url)
    .then(data => {
     // console.log(data.data)
      ref.setState({
        posts: data.data,
        load: false,
      })
    }).catch(error => {
      console.log(error)
    })    
  }
  render() {
    return (
      
      <div className="container">
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Тестовое задание</h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">https://market.yandex.ru/catalog/54726/list?clid=817&onstock=1&local-offers-first=1</p>
          <input type="text" className="form-control" placeholder="Вставьте URL" onChange={this.handleChange}/>
          <button className="btn btn-primary" onClick={this.sendUrl}>Получить</button>
          <br/>
          {this.state.load ? 'Загрузка...'  : null}
          <Row>
            {!this.state.posts ? null :
              this.state.posts.map(item => {
                return (
            <Col lg="4" md="12" className="mb-lg-0 mb-4 p-3" key={item.title}>
              <Card wide ecommerce>
                
                <CardBody cascade className="text-center">
                  <CardTitle>
                    <strong><a href="">{item.title}</a></strong>
                  </CardTitle>
                  <CardFooter className="px-1">
                    <span className="float-left font-weight-bold">
                      <strong>{item._price}</strong>
                    </span>
                    <span className="float-right">
                      <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-eye grey-text ml-3" tooltipContent="Quick look"/>
                      <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-heart grey-text ml-3" tooltipContent="Add to watchlist"/>
                    </span>
                  </CardFooter>
                </CardBody>
              </Card>
            </Col>
                )
              }) 
            }
            
           
            
          </Row>
        </section>

       
      </div>
    );
  }
}

export default App;
/* 
 <div style={{position: 'absolute', zIndex: 1000}}><SnowStorm /></div>
        <div style={{width: '100%', height: '30px', background: "#f1f1f1", padding: 5,}} className="text-center">
          <a href="#" className="text-center">Акции | </a>
          <a href="#" className="text-center">Доставка  | </a>
          <a href="#" className="text-center">Оплата</a>
        </div>
        <NavBarPage />
        <CarouselPage />
        <div style={{width: '100%', height: '50vh', backgroundColor: "#000"}}></div>*/