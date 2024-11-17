import { Layout } from "antd";
import * as React from "react";
import SliderBar from "./SliderBar";
import NavHeader from "./NavHeader";
import { Link } from "react-router-dom";
const { Content, Footer } = Layout;

export default class WrapContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <SliderBar />
        <Layout className="site-layout" style={{ marginLeft: 250 }}>
          <NavHeader />
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              minHeight: "calc(100vh - 88px)",
              height: "fit-content",
            }}
          >
            <div className="site-layout-background" style={{ padding: 24, textAlign: "center" }}>
              {this.props.children}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}
