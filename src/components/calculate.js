import React, { useState ,useEffect} from 'react';
import 'antd/dist/antd.css';
import { Form, Input,Col ,Typography,Row} from 'antd';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const { Title,Text } = Typography;


const Calculate = () => {

    const [calculateObj, setCalculateObj] = useState({
        firstValue: '',
        lastValue:'',
        investment : '',

    })
    console.log("sy",typeof calculateObj.lastValue)
    let rateOfChange = ((calculateObj.lastValue - calculateObj.firstValue) / calculateObj.firstValue) * 100
    let difference = calculateObj.lastValue - calculateObj.firstValue
    let investment = (rateOfChange * calculateObj.investment)/100 // (-50 yüzde x 100 TL yatırdım)/ 100   = 50 TL zarar

    const onFinish = (values) => {
    };

    const onFinishFailed = (errorInfo) => {
    };



    return (
        <>
            <Title level={4}>Calculate</Title>

            <Form
            {...layout}
            name="calculateForm"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >


            <Form.Item
                label="İlk değer"
                name="firstValue"
                rules={[
                    {
                        required: true,
                        message: 'ilk değer giriniz!',
                    },
                ]}
            >
                <Input onChange={ e => setCalculateObj({ ... calculateObj, ["firstValue"]: parseInt(e.target.value) }) } />
            </Form.Item>

            <Form.Item
                label="Son değer"
                name="lastValue"
                rules={[
                    {
                        required: true,
                        message: 'Son değer giriniz!',
                    },
                ]}
            >
                <Input onChange={ e => setCalculateObj({ ... calculateObj, ["lastValue"]: parseInt(e.target.value) }) }  />
            </Form.Item>

            <Form.Item
                    label="Yatırım $"
                    name="investment"
                    rules={[
                        {
                            required: true,
                            message: 'Son değer giriniz!',
                        },
                    ]}
                >
                    <Input onChange={ e => setCalculateObj({ ... calculateObj, ["investment"]: parseInt(e.target.value) }) }  />
            </Form.Item>

                <Form.Item>
             <Row>
                <Col span={12}>
                    <Text>Değişim Oranı: { rateOfChange ? <span style={{color: rateOfChange < 0 ? "red" : "#16c784", fontWeight:"bold"}}> {rateOfChange + " % "} </span> : null} </Text>
                </Col>
                <Col span={12}>
                    <Text>Kar/Zarar Miktarı $: {isNaN(investment) ? null : <span style={{color: investment < 0 ? "red" : "#16c784", fontWeight:"bold"}}> {investment} </span>} </Text>
                </Col>
             </Row>
                </Form.Item>


        </Form>
            </>
    );
};

export default Calculate;
