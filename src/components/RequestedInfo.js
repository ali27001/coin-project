import {Card, Image, Row} from "antd";
import {currentFixed} from "../utils";

const RequestedInfo = ({queryDate, dataName, dataPriceUsd, dataImg}) => (
    <Row style={{marginBottom: 30}}>
        <Card title={dataName} bordered={true} style={{width: 300}} extra={dataImg ?
            <Image
                src={dataImg.small}
                width={35}
            />
            : null

        }>
            <p>{queryDate} ' tarihindeki fiyatı {dataPriceUsd + " usd"} </p>
        </Card>

    </Row>
)


export default RequestedInfo;