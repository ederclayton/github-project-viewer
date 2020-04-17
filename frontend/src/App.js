import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import ProjectCard from './components/ProjectCard';
import Header from './components/Header';

const api = {
  baseUrl: 'https://api.github.com',
  client_id: '06cd85a1dc019b802809',
  client_secret: 'a17657f1ccc906ec193e3e45fe19e47ac59d0284'
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      language: '',
      githubData: []
    }
  }

  updateLanguage(language) {

    this.setState( {language} );

    axios.get(
      api.baseUrl
      + "/search/repositories?q=language:"
      + language
      + "&sort=stars&page=1&client_id="
      + api.client_id
      + "&client_secret="
      + api.client_secret
    ).then((res) => { 
      console.log(res.data);
      this.setState({githubData: res.data.items});
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { githubData, language } = this.state;
    return (
      <div>
        <Header 
          title="GitHub" 
          subtitle="Project Viewer" 
          updateLanguage={e => this.updateLanguage(e)}
          language={language}
        />

        <div className="container projects">
          {githubData.map((element) => (
            <ProjectCard key={element.id} item={element}/>
          ))}
        </div>
      </div>
    );
  };
}

export default App;
