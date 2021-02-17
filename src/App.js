import './App.css';
import React, {useState} from "react";
import CoinForm from './components/form';
import { Row, Col } from 'antd';
import TableCoin from "./components/tableCoin";


function App() {
    const [marketData,setMarketData] = useState([])
console.log("app-marketdata",marketData)
  return (
    <div className="App">

        <Row>
            <Col span={3}>col-3</Col>
            <Col style={{ marginTop: 70 }} span={18}>

                <CoinForm setMarketData={setMarketData}/>
                <TableCoin marketData={marketData}/>

            </Col>
            <Col span={3}>col-3</Col>
        </Row>

    </div>
  );
}

export default App;
