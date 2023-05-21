import React from "react";

const getOrdinalString = (number) => {
  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd",
  };

  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return number + "th";
  }

  return number + (suffixes[lastDigit] || "th");
};

function LeaderBoardItem({ rank, avatar, color, name, totalTasks, totalCompleted, successRate }) {
  return (
    <div className="leaderboard-item">
      <div className="rank" style={{color: "#"+color}}>{getOrdinalString(rank)}</div>
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
        <small>Subtasks Completed</small>
      </div>
      <div className="score">
        <b>{successRate}%</b>
        <small>Completed Rate</small>
      </div>
    </div>
  );
}

export default LeaderBoardItem;