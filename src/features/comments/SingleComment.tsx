import { Comment } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import { removeComment } from "./commentsSlice";
import './singleComment.scss';

export function SingleComment({ id, description, date }: Comment) {
  const dispatch = useAppDispatch();

  return (
    <div className='singleComment'>
      <p>{description}</p>
      <div className="singleComment-info">
        <button onClick={() => dispatch(removeComment(id))}>X</button>
        <span>{date}</span>
      </div>
    </div>
  );
}