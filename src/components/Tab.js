import React from "react";
import PropTypes from "prop-types";

function Tab({ activeTab, label, onClick }) {

  const handleClick = () => {
    onClick(label);
  };

  let className = "tab-list-item";

  if (activeTab === label) {
    className += " tab-list-active";
  }

  return (
    <li className={className} onClick={handleClick}>
      {label}
    </li>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;