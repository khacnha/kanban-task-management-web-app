import React from "react";
import PropTypes from "prop-types";
import LeaderBoardItem from "./Item";
import "../../styles/LeaderBoard.css"

function LeaderBoard({ data }) {
  return (
    <div className="leaderboard">
      {data.map(({ rank, avatar, name, totalTasks, totalCompleted, successRate }) => (
        <LeaderBoardItem
          key={rank}
          rank={rank}
          avatar={avatar}
          name={name}
          totalTasks={totalTasks}
          totalCompleted={totalCompleted}
          successRate={successRate}
        />
      ))}
    </div>
  );
}

LeaderBoard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      totalTasks: PropTypes.number.isRequired,
      totalCompleted: PropTypes.number.isRequired,
      successRate: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderBoard;