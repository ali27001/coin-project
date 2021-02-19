import React from 'react';
import 'antd/dist/antd.css';
import {Table, Tag, Space, Image} from 'antd';
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
        render: current_price =>  <span>{currentFixed(current_price) + " $"}</span>
    },
    {
        title: 'Değişim %(en düşük değer ile güncel fiyat)',
        key: 'atl_change_percentage',
        dataIndex: 'atl_change_percentage' ,
        render: atl_change_percentage =>  <span>{" % "+currentFixed(atl_change_percentage,0) }</span>
    },
];

const TableCoin = ({marketData}) => {
    return(
        <Table columns={columns} dataSource={marketData} />
    )
}
export default TableCoin
