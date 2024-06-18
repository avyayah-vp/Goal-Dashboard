import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
import { AiOutlineSave } from "react-icons/ai"; // Save icon

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(goal.text);

  const handleSave = () => {
    dispatch(updateGoal({ goalId: goal._id, updatedData: { text: editText } }));
    setIsEditing(false);
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "15px",
            boxShadow: "0 0 15px 4px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
            outline: "none",
            width: "100%",
          }}
        />
      ) : (
        <h2>{goal.text}</h2>
      )}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <BsFillTrash3Fill />
      </button>
      <button
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
        className="edit"
      >
        {isEditing ? <AiOutlineSave /> : <BsPencilSquare />}
      </button>
    </div>
  );
}

export default GoalItem;
