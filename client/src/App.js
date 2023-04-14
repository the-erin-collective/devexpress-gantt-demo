import React, { useEffect, useState } from "react";
const apiBaseUrl = 'http:/localhost:8080/';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [resourceAssignments, setResourceAssignments] = useState([]);


  const fetchResourceData = () => {
    return fetch(new URL('resources', apiBaseUrl))
      .then(response => response.json())
  };

  const fetchTaskData = () => {
    return fetch(new URL('tasks', apiBaseUrl))
      .then(response => response.json())
  };

  const fetchDependencyData = () => {
    return fetch(new URL('dependencies', apiBaseUrl))
      .then(response => response.json())
  };

  const fetchResourceAssignmentData = () => {
    return fetch(new URL('resourceAssignments', apiBaseUrl))
      .then(response => response.json())
  };

  useEffect(() => {
    Promise.all([
      fetchResourceData(),
      fetchTaskData(),
      fetchDependencyData(),
      fetchResourceAssignmentData()
    ]).then(([resourcesData, tasksData, dependenciesData, resourceAssignmentsData]) => {
      setResources(resourcesData);
      setTasks(tasksData);
      setDependencies(dependenciesData);
      setResourceAssignments(resourceAssignmentsData);
      setLoading(false);
      console.log('saving data');
      (window).tasks = tasksData;
      (window).dependencies = dependenciesData;
      (window).resourceAssignments = resourceAssignmentsData;
      (window).resources = resourcesData;
      /* eslint-disable no-undef */
      buildGantt();
    });
  }, []);
 
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
      </div>
    );
  }
};

export default App;