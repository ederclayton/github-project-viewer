import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';

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
      pages: 0,
      currentPage: 1,
      githubData: []
    }

    this.nextPage = this.nextPage.bind(this);
  }

  updateLanguage(language) {
    let state = this.state;

    axios.get(
      api.baseUrl
      + "/search/repositories?q=language:"
      + language
      + "&sort=stars&per_page=32&page=1&client_id="
      + api.client_id
      + "&client_secret="
      + api.client_secret
    ).then((res) => { 
      const totalPages = Math.round(res.data.total_count / 32);
      const maxPages = 30;

      state.language = language;
      state.pages = totalPages > maxPages ? maxPages : totalPages;
      state.githubData = res.data.items;
      state.currentPage = 1;

      this.setState( state );

    }).catch((err) => {
      console.log(err);
    });
  }

  nextPage(event, currentPage) {
    this.setState({ currentPage });
    
    axios.get(
      api.baseUrl
      + "/search/repositories?q=language:"
      + this.state.language
      + "&sort=stars&per_page=32&page="
      + currentPage
      + "&client_id="
      + api.client_id
      + "&client_secret="
      + api.client_secret
    ).then((res) => { 
      const githubData = res.data.items;
      this.setState({ githubData });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { githubData, language, pages, currentPage } = this.state;
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

        { pages !== 0 ? 
          <Pagination 
            className="pagination-projects" 
            count={pages}
            page={currentPage}
            onChange={this.nextPage}
          /> : 
          null }
      </div>
    );
  };
}

export default App;
