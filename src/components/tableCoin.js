import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Image, Input} from 'antd';
import * as moment from "moment";
import {currentFixed} from "../utils";


const dateFormat = 'DD-MM-YYYY';
const columns = [
    {
        title: 'İd',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'image',
        dataIndex: 'image',
        key: 'image',
        render: img =>  <Image width={25}
            src={img}
        />
    },
    {
        title: 'en düşük tarih',
        dataIndex: 'atl_date',
        key: 'atl_date',
        render: alt_date =>  <span>{moment(alt_date).format(dateFormat)}</span>
    },
    {
        title: 'en düşük değeri',
        key: 'atl',
        dataIndex: 'atl',
        render: atl =>  <span>{currentFixed(atl)  + "$"}</span>
    },
    {
        title: 'en yüksek tarih',
        dataIndex: 'ath_date',
        key: 'ath_date',
        render: alh_date =>  <span>{moment(alh_date).format(dateFormat)}</span>
    },
    {
        title: 'en yüksek değeri',
        key: 'ath',
        dataIndex: 'ath',
        render: ath =>  <span>{currentFixed(ath)  + "$"}</span>
    },
    {
        title: 'Güncel fiyat',
        key: 'current_price',
        dataIndex: 'current_price' ,
        render: current_price =>  <span style={{color:"#16c784", fontWeight:"bold"}}>{currentFixed(current_price) + " $"}</span>
    },
    {
        title: 'Değişim %(en düşük değer ile güncel fiyat)',
        key: 'atl_change_percentage',
        dataIndex: 'atl_change_percentage' ,
        render: atl_change_percentage =>  <span>{" % "+currentFixed(atl_change_percentage,0) }</span>
    },
];

const TableCoin = ({marketData}) => {
    const [filtredData, setFilteredData] = useState(null)
    const searchHandle = (value) => {
        let result = marketData.filter(c => c.id.includes(value) || c.symbol.includes(value))
        setFilteredData(result);
    }

    return(
        <>
            <Input
                style={{ border: "3px solid  #16c784", margin: "0 0 10px 0" }}
                placeholder="Search by id"
                onChange={(e) => searchHandle(e.target.value)}

            />
        <Table columns={columns} dataSource={filtredData === null ? marketData : filtredData} />
        {/*<Table columns={columns} dataSource={marketData} />*/}
        </>
    )
}
export default TableCoin
