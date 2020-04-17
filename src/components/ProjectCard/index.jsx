import React from 'react';
import './style.css';

const ProjectCard = (props) => {
  return (
    <div className="project-card">
      <div className="project-card-footer">
        <img src={props.item.owner.avatar_url} alt="profile-img"/>
      </div>
      
      <div className="project-card-info">
        <p className="title">{props.item.name}</p>
        <p><b>Owner:</b> {props.item.owner.login}</p>
        <p><b>Stars:</b> {props.item.stargazers_count}</p>
        <p><b>Forks:</b> {props.item.forks}</p>

        <div className="project-card-footer">
          <a 
            className="btn btn-secondary center" 
            href={props.item.html_url} 
            role="button"
            rel="noopener noreferrer"
            target="_blank">
              Visit the Project
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;