import { Row, Dropdown, Menu } from "antd";
import withRouter from "@/components/Layout/Router/withRouter";
import { AppLayouts } from "@/components/Layout/Router/router.config";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import UserStore from "@/stores/userStore";
// const logo = require("@/assets/icons/twemoji_money-bag.svg") as string;
const logo: string = require("@/assets/icons/twemoji_money-bag.svg").default;
const backArrow: string = require("@/assets/icons/backArrow.svg").default;
const userIcon: string = require("@/assets/icons/user-icon.svg").default;

interface IProps {
  navigate: any;
  userStore: UserStore;
}

const Header = inject(Stores.UserStore)(
  observer((props: IProps) => {
    const { userStore } = props;
    const handleSignOut = () => {
      userStore.signOut();
    };
    return (
      <Row className="flex justify-between items-center gap-10 px-2 py-3 bg-white">
        <div className="flex justify-center items-center gap-10">
          <div
            className="flex justify-center items-center w-[46px] h-[46px]"
            onClick={() => props.navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            <img src={backArrow} className="back-btn" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <img src={logo} className="logo" style={{ width: "40px" }} />
            <h1
              className="title"
              style={{
                fontSize: "35px",
                color: "#28CD9E",
                textTransform: "capitalize",
                letterSpacing: "1px",
                fontWeight: "700",
                fontFamily: "Montserrat",
              }}
            >
              Money Map
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Dropdown
            trigger={["hover"]}
            overlay={
              <Menu>
                <Menu.Item key={Math.random()}>MY ACCOUNT</Menu.Item>
                <Menu.Item
                  key={Math.random()}
                  onClick={() => props.navigate(AppLayouts.settingPage.path)}
                >
                  SETTINGS
                </Menu.Item>
                {userStore.isLoggedIn && (
                  <Menu.Item onClick={handleSignOut}>SIGN OUT</Menu.Item>
                )}
              </Menu>
            }
            placement="bottomLeft"
          >
            <div style={{ display: "flex" }}>
              <img
                src={userIcon}
                className="avatar"
                style={{ width: "30px" }}
              />
            </div>
          </Dropdown>
          <div className="info">{userStore.profile?.userName ?? ""}</div>
        </div>
      </Row>
    );
  })
);

export default withRouter(Header);
