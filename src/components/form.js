import React, { useState ,useEffect} from 'react';
import {Form, Input, Button, Image, Checkbox, Row, Col,Card} from 'antd';
import axios from 'axios';
import DatePicker from "antd/es/date-picker";
import * as moment from "moment";
import {currentFixed} from "../utils";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const CoinFrom = ({setMarketData}) => {
    const [data, setData] = useState(null) //history
    const [genesisDateShow, setGenessisDateShow] = useState(true)
    //const [genesisDate, setGenessisDate] = useState(null)
    const [currentData,setCurrentData] = useState({})
    console.log("dataaa",data)
    const dateFormat = 'DD-MM-YYYY';
    const [queryDate, setQueryDate] = useState(null)


    const onFinish = (values) => {
        console.log('Success:', values);
        let coinDate = values.customDate || []
console.log("coindateaa",coinDate)
if(genesisDateShow){

    setData()

    console.log("genesis girdi")
    // axios(`https://api.coingecko.com/api/v3/coins/${values.coinName}`)
    //     .then(response =>{
    //         console.log("şuanki datalar geldi",response.data)
    //         setCurrentData(response.data)
    //         coinDate = moment(response.data.genesis_date).format(dateFormat)
    //         console.log("servise gidecek kurulus tarihi",coinDate)
    //     })
    //     .catch(error =>{
    //         console.error(error)
    //         console.log("hata oldu setGenesisDate")
    //     })
    //



} else {
    //belirli tarihteki verilerileri getirir
    console.log("coindate if dısında",coinDate)
    coinDate = coinDate.format(dateFormat)
    setQueryDate(coinDate)

    axios(`https://api.coingecko.com/api/v3/coins/${values.coinName}/history?date=${coinDate}`)
        .then(response =>{
            setData(response.data)
        })
        .catch(error =>{
            console.error(error)
            console.log("hata oldu")
        })
}







    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onChangeGenesisDate(e) {
        console.log(`checked = ${e.target.checked}`)
        setGenessisDateShow(e.target.checked)
    }

    useEffect(() => {
        axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`)
            .then(response =>{
                setMarketData(response.data)
            })
            .catch(error =>{
                console.error(error)
                console.log("market data alınırken hata oldu")
            })

    },[])

    return (
       <>
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Coin Adı"
                name="coinName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your date!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="coin tarihi" style={{ marginBottom: 0 }}>
            <Form.Item
                name="customDate"
                rules={[
                    {
                        required: false,
                        message: 'Please input your date!',
                    },
                ]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <DatePicker  defaultValue={moment()} format={dateFormat} disabled={genesisDateShow} />

            </Form.Item>

                <Form.Item
                    name="genesisDate"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Checkbox onChange={onChangeGenesisDate} defaultChecked={genesisDateShow}>En düşük olduğu tarih</Checkbox>

                </Form.Item>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>



        </Form>
         <Row style={{ marginBottom: 30 }}>

           <Card title={data  && data.name } bordered={true} style={{ width: 300 }} extra=  {data && data.image ?
               <Image
                   src={data.image.small}
                   width={35}
               />
               : null

           }>
               <p>{queryDate} ' tarihindeki fiyatı {data && currentFixed(data.market_data.current_price.usd) + " usd"} </p>
           </Card>
         </Row>

           </>
    );
};

export default CoinFrom;
