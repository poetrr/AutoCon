import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ProjectCard from './ProjectCard'; // Import your new ProjectCard component

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8081/projects?user_id=1');
        const data = await response.json();
        setProjects(data.projects); // Assuming the response structure has projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <main className="p-6 mt-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} /> // Render each project
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
