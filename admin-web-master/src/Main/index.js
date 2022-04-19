import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  uuseResetRecoilState,
} from "recoil";
import { userInfoState } from "../@store/userInfo";
import Storage from "../@plugins/Storage";
import MenuButton from "./MenuButton";
import userInfoApi from "../@api/userInfoApi";
import { menuState } from "../@store/menu";

function Main() {
  const resetUserInfoState = useResetRecoilState(userInfoState);
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useRecoilState(menuState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const getUserInfo = () => {
    userInfoApi
      .getUserInfo()
      .then((response) => {
        if (response.success) {
          setUserInfo(response.user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (Storage.token.get() == "") {
      navigate("/login");
    } else {
      getUserInfo();
    }
  }, []);

  const menuList = [
    // { title: '일반 정보 관리', location: '/general' },
    {
      title: "회원 관리",
      location: "/user",
      icon: require("../@static/image/menu/users.svg").default,
    },
    { title: "열린 기도방", location: "/prayRoom", icon: require("../@static/image/menu/door.svg").default, },
    { title: "소공동체 기도방", location: "/smallPrayRoom", icon: require("../@static/image/menu/hands.svg").default, },
    { title: "통계", location: "/stats", icon: require("../@static/image/menu/graph.svg").default, },
    { title: "커뮤니티 게시판 관리", location: "/community/post", icon: require("../@static/image/menu/community.svg").default, },
    { title: "신고된 게시글", location: "/report", icon: require("../@static/image/menu/alarm.svg").default, },
    { title: "일반정보관리", location: "/general", icon: require("../@static/image/menu/text.svg").default, },
    { title: "관리자 계정 관리", location: "/admin", icon: require("../@static/image/menu/admin.svg").default, },
    { title: "공지사항", location: "/community/notice", icon: require("../@static/image/menu/board.svg").default, },
    { title: "이벤트", location: "/community/event", icon: require("../@static/image/menu/event.svg").default, },
  ];

  const NavBar = () => {
    return (
      <div
        style={{
          height: '100%',
          width: 340,
          paddingInline: 10,
          paddingBottom: 60,
          paddingTop: 60,
          background: "#062D47",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 45,
                    height: 45,
                    background: 'url(' + require('../@static/image/menu/logo.svg').default + ') no-repeat',
                  }}
                />

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "grey",
                    marginLeft: 10,
                    width: "250px",
                  }}
                >
                  GOODNEWS 관리자웹
                </div>
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "grey",
                  marginLeft: 10,
                  marginTop: 15,
                }}
              >
                접속자 | {userInfo.name}
              </div>
            </div>

            <div
              style={{
                color: "#FFFFFF",
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                // alignItems: "flex-start",
              }}
            >
              {menuList.map((item) => {
                return (
                  <MenuButton
                    onClick={() => {
                      navigate(item.location);
                      setMenu(item.title);
                      
                    }}
                    key={item.title}
                    enabled={location.pathname == item.location}
                  >
                    <div style={{}}></div>
                    <div
                      style={{
                        textAlign:"left",
                        paddingLeft:50,
                        paddingRight: 25,
                        fontSize: 20,
                        width: 300,
                        height: 30,
                        background: "url(" + item.icon + ") no-repeat",
                      }}
                    >{item.title}</div>

                  </MenuButton>
                );
              })}
            </div>
          </div>
        </div>

        <button
          style={{
            paddingInline: 40,
            background: "transparent",
            borderColor: "transparent",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => {
            resetUserInfoState();
            Storage.token.reset();
            navigate("/login");
          }}
        >
          로그아웃
        </button>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          background: "#F7F8FC",
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        {NavBar()}
        <Outlet context={{ username: userInfo.name }} />
      </div>
    </>
  );
}

export default Main;
