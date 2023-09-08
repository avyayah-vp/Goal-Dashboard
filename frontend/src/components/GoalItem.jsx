import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { BsFillTrash3Fill } from "react-icons/bs";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <BsFillTrash3Fill />
      </button>
    </div>
  );
}

export default GoalItem;
