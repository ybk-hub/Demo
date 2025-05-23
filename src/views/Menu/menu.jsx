import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            {
                key: 'sub1',
                label: 'Navigation One',
                icon: <MailOutlined />,
                children: [
                    {
                        key: 'g1',
                        type: 'group',
                        children: [
                            { key: '1', label: 'Option 1' },
                            { key: '2', label: 'Option 2' },
                        ],
                    },
                    {
                        key: 'g2',
                        type: 'group',
                        children: [
                            { key: '3', label: 'Option 3' },
                            { key: '4', label: 'Option 4' },
                        ],
                    },
                ],
            },
            {
                key: 'sub2',
                label: 'Navigation Two',
                icon: <AppstoreOutlined />,
                children: [
                    { key: '5', label: 'Option 5' },
                    { key: '6', label: 'Option 6' },
                    {
                        key: 'sub3',
                        label: 'Submenu',
                        children: [
                            { key: '7', label: 'Option 7' },
                            { key: '8', label: 'Option 8' },
                        ],
                    },
                ],
            },
            {
                key: 'sub4',
                label: 'Navigation Three',
                icon: <SettingOutlined />,
                children: [
                    { key: '9', label: 'Option 9' },
                    { key: '10', label: 'Option 10' },
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ],
    },
];
const App = () => {
    const onClick = e => {
        console.log('click ', e);
    };
    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            expandIcon={null}
        />
    );
};
export default App;