import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import Newsapp from './component/Newsapp';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  pageSize = 10

  //Remember to restart the server after setting .env otherwise you get an error
  api_key = process.env.REACT_APP_API_KEY2
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />

          {/* Here we use key to indicate the routes that even if we call the same component but still they are different in different circumstances so it need call and repload again and again ... If Component is different there is not need to use the key attribute */}
          <Routes>
            <Route path="/" element={<Newsapp key={" "} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"general"} />} />
            <Route path="/general" element={<Newsapp key={"general"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"general"} />} />
            <Route path="/business" element={<Newsapp key={"business"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"business"} />} />
            <Route path="/entertainment" element={<Newsapp key={"entertainment"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"entertainment"} />} />
            <Route path="/health" element={<Newsapp key={"health"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"health"} />} />
            <Route path="/science" element={<Newsapp key={"science"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"science"} />} />
            <Route path="/sports" element={<Newsapp key={"sports"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"sports"} />} />
            <Route path="/technology" element={<Newsapp key={"technology"} api_key={this.api_key} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"technology"} />} />
          </Routes>
        </div>
      </Router >
    )
  }
}