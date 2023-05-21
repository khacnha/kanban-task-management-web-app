import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LeaderBoardItem from "./Item";
import "../../styles/LeaderBoard.css"
import { boardsAPI } from "../../core/api";

const getColorByRank = (rank) => {
  const topColors = ['FDAE17', 'CC4628', '95A4AB'];
  const defaultColor = 'D3D3D3';

  if (rank >= 1 && rank <= 3) {
    return topColors[rank - 1];
  }

  return defaultColor;
};

function LeaderBoard({ id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await boardsAPI.getLeaderboard(id)
        setData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="leaderboard">
      {data.map(({ id, username, total_tasks, total_subtaskstalTasks, total_completed_subtasks, completion_rate }, index) => (
        <LeaderBoardItem
          key={id}
          rank={index+1}
          color={getColorByRank(index+1)}
          avatar={`https://ui-avatars.com/api/?name=${username}&background=${getColorByRank(index+1)}&color=fff`}
          name={username}
          totalTasks={total_tasks}
          totalCompleted={total_completed_subtasks}
          successRate={completion_rate}
        />
      ))}
    </div>
  );
}

LeaderBoard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LeaderBoard;