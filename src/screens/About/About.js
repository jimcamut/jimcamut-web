import React, { useState, useEffect } from 'react';
import './style.scss';
import { Tabs } from 'antd';
import AboutMe from './AboutMe';
import Resume from './Resume';

const { TabPane } = Tabs;

const getTabPosition = () => (window.innerWidth > 600 ? 'left' : 'top');

const About = () => {
  const [tabPosition, setTabPosition] = useState('top');
  const [tab, setTab] = useState('1');

  const setTabPositionWrapper = () => {
    const position = getTabPosition();
    setTabPosition(position);
  };

  useEffect(() => {
    setTabPositionWrapper();
    window.addEventListener('resize', setTabPositionWrapper);
    return () => window.removeEventListener('resize', setTabPositionWrapper);
  }, []);

  const tabItems = [
    {
      name: 'About',
      key: '1',
      component: AboutMe
    },
    {
      name: 'Resume',
      key: '2',
      component: Resume
    }
  ];
  return (
    <div className="page-about">
      <div className="container">
        <Tabs
          defaultActiveKey="1"
          activeKey={tab}
          onChange={setTab}
          tabPosition={tabPosition}
        >
          {tabItems.map(it => {
            const Pane = it.component;
            return (
              <TabPane tab={it.name} key={it.key}>
                <Pane />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default About;
