import * as React from "react";
import './app.scss';
import Header from"../Header/header"
export interface IAppProps {}

export default function IApp(props: IAppProps) {
  return (
    <div className="main">
      <Header />
    </div>
  );
} 