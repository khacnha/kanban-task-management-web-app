import React from "react";

function LeaderBoardItem({ rank, avatar, name, totalTasks, totalCompleted, successRate }) {
  return (
    <div className="leaderboard-item">
      <div className="rank">{rank}</div>
      <div className="user">
        <img className="avatar" src={avatar} alt={name} />
        <div className="name">{name}</div>
      </div>
      <div className="score">
        <b>{totalTasks}</b>
        <small>Total Tasks</small>
      </div>
      <div className="score">
        <b>{totalCompleted}</b>
        <small>Total Tasks</small>
      </div>
      <div className="score">
        <b>{successRate}%</b>
        <small>Total Tasks</small>
      </div>
    </div>
  );
}

export default LeaderBoardItem;