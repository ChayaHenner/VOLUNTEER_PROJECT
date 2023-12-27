import React from 'react'

const MyMission = ({mission}) => {
  // const mission = {
  //   title: 'Mission Title',
  //   description: 'Mission Description',
  //   address: 'Mission Address',
  //   time: 'Mission Time',
  //   date: 'Mission Date',
  //   creator: 'Mission Creator',
  //   taken: false // Default value
  // };

  return (
    <div className="mission-details">
      <h2>Title: {mission.title}</h2>
      <p>Description: {mission.description}</p>
      <p>Address: {mission.address}</p>
      <p>Date: {mission.date}</p>
      <p>Time: {mission.time}</p>
      <p>Creator: {mission.creator}</p>
      <p>Taken: {mission.taken ? 'Yes' : 'No'}</p>
    </div>
  );}

export default MyMission