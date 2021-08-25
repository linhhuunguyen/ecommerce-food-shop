import * as React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export interface TopbarProps {}

export default function Topbar(props: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/126020168_1030167817494604_7437205793220969808_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=0rPvYY_EOkkAX_awLeN&tn=dvaRpmLiWYipCVuh&_nc_ht=scontent-hkg4-1.xx&oh=4abcc713e1fbafe2f8a6e12be0f665dc&oe=614B2368"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
