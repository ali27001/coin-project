import React, { useState ,useEffect} from 'react';
import {Form, Input, Button, Image, Checkbox, Select, Col, Row,Typography} from 'antd';
import RequestedInfo from './requestedInfo.js';
import axios from 'axios';
import DatePicker from "antd/es/date-picker";
import * as moment from "moment";
import {currentFixed} from "../utils";
import Calculate from "./calculate";
const { Option } = Select;

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
const { Title } = Typography;
const dateFormat = 'DD-MM-YYYY';
const CoinFrom = ({setMarketData, marketData}) => {
    const [data, setData] = useState(null) //history
    const [genesisDateShow, setGenessisDateShow] = useState(true)
    console.log("data",data)
    const [queryDate, setQueryDate] = useState(moment().format(dateFormat))
    const [coinNames, setCoinNames] = useState([]);
    const [currentAmountUsd, setCurrentAmountUsd] = useState(null)
    // istenilen coin tipinin en düşük değerinin tarihini buldu
    const findATLDate = (coinID) => {
        let ATLDate = marketData?.filter((c) => c.id == coinID )[0]?.atl_date
        return moment(ATLDate).format(dateFormat);
    }


    const onFinish = (values) => {
        const result = marketData.filter(c => c.id === values.coinName);
        setCurrentAmountUsd(result[0].current_price)
        console.log('Success:', values);
         let coinDate =  genesisDateShow ? findATLDate(values.coinName) : values.customDate ? values.customDate.format(dateFormat)  : moment().format(dateFormat) ;
        setQueryDate(coinDate)
        if(moment().format(dateFormat) === coinDate) {
            let dataObject = {
                image: result[0].image,
                name: result[0].name,
                market_data: {
                    current_price:{ usd: result[0].current_price}
                }
            }
            setData(dataObject);
        }
        else {
            axios(`https://api.coingecko.com/api/v3/coins/${values.coinName}/history?date=${coinDate}`)
                .then(response => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch(error => {
                    console.error(error)
                    console.log("hata oldu")
                })
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onChangeGenesisDate(e) {
        setGenessisDateShow(e.target.checked)
    }
    const setCoinNameInput = () => {
      let names = marketData.map((c) => <Option value={c.id}>{c.id}</Option>)

      setCoinNames(names);
    }
    useEffect(() => {
        if(!marketData.length){
        axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`)
            .then(response =>{
                setMarketData(response.data)
            })
            .catch(error =>{
                console.error(error)
                console.log("market data alınırken hata oldu")
            })}
        else(setCoinNameInput())
    },[marketData])
    return (
       <>
           <Row gutter={[16, 16]}>
            <Col span={12}>
                <Title level={4}>Coin History & Price</Title>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    style={{ textAlign: 'Left' }}
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
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Coin Adı Seçiniz (id)"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {coinNames.map(c => (c) )}
                        </Select>
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
                        <DatePicker  defaultValue={moment()} format={dateFormat} disabled={genesisDateShow}/>
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
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

           <Col span={12}>
            <Calculate/>
           </Col>
           </Row>
           {data && <RequestedInfo queryDate={queryDate}  dataName={data.name} dataPriceUsd={data.market_data.current_price.usd } dataImg={data.image} currentAmountUsd={currentAmountUsd}/>}
       </>
    );
};

export default CoinFrom;
