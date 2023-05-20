import React, { useState, useEffect } from "react";
import { userApi } from "../core/api";


const UserSelect = ({ valueDefault, onSelected }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(valueDefault ?? "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userApi.getAll()
        setOptions(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (onSelected)
      onSelected(value);
  };

  return (
    <div className="select-column-container">
      <label className="text-M">Assigned By</label>
      <select disabled={onSelected ? false : true} className="select-status text-L" value={selectedOption} onChange={handleSelectChange}>
        <option className="status-options" value="">Select User</option>
        {options.map((option) => (
          <option className="status-options" key={option.id} value={option.id}>
            {option.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
