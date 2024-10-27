import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{project.project_name}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

export default ProjectCard;