import * as React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

export interface AdminProps {}

export default function Admin(props: AdminProps) {
  return (
    <div>
      <Topbar />
      <Sidebar />
    </div>
  );
}
