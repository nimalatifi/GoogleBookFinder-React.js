import * as React from "react";
import './app.scss';
import Header from "../Header/header"
import SearchArea from '../SearchArea/searchArea';
import Footer from "../Footer/footer"


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <SearchArea />
        <Footer />
      </React.Fragment>
    )
  }
}
export default App
