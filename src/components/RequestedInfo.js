import {Card, Image, Row} from "antd";
import {currentFixed} from "../utils";

const RequestedInfo = ({queryDate, dataName, dataPriceUsd, dataImg, currentAmountUsd}) => {
        const CAU =  (1000 / dataPriceUsd) * currentAmountUsd;
    return(
        <Row style={{marginBottom: 30}}>
            <Card title={dataName} bordered={true} style={{width: 450}} extra={dataImg ?
                <Image
                    src={dataImg.small}
                    width={35}
                />
                : null
            }>
                <p>{queryDate} ' tarihindeki fiyatı {currentFixed(dataPriceUsd) + " usd"} </p>
                <p>{queryDate} tarihinde {dataName} için 1000$ yatırım yapmış olsaydın Şu anki değeri <span style={{color: CAU < 1000 ? "red" : "#16c784", fontWeight:"bold"}}>{currentFixed(CAU)} $ </span> olacaktı</p>

            </Card>
        </Row>
    )
}

export default RequestedInfo;