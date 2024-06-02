import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
const BreadcrumbComponent = () => {
  return (
    <Breadcrumb>
        <Breadcrumb.Item>
        <Link to="/">
            <HomeOutlined />
        </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className='text-orange-600'>
        <ShopOutlined />
        <span>Product</span>
        </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
