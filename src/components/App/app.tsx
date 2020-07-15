import * as React from "react";
import './app.scss';
export interface IAppProps {}

export default function IApp(props: IAppProps) {
  return (
    <div className="main">
      <h1>Hello React Typescript!</h1>
    </div>
  );
} 