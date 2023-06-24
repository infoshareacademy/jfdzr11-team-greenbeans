import React from "react";
import styles from "./IdeaCard.module.css";

const IdeaCard = ({
  id,
  user,
  idea,
  date,
  handleEdit,
  handleDelete,
  handleCheck,
  handleCancel,
  isEdited = false,
}) => {
  return (
    <div className={styles.ideaCard}>
      <div className={styles.user}>
        <span>{user}</span>
        <span>{date}</span>
      </div>
      {!isEdited && (
        <>
          <p>{idea}</p>
          <div className={styles.btn}>
            <button onClick={handleEdit}>EDIT</button>
            <button onClick={handleDelete}>DELETE</button>
          </div>
        </>
      )}
      {isEdited && (
        <>
          <textarea defaultValue={idea}></textarea>
          <div className={styles.btn}>
            <button onClick={handleCheck}>CHECK</button>
            <button onClick={handleCancel}>CANCEL</button>
          </div>
        </>
      )}
    </div>
  );
};

export default IdeaCard;
