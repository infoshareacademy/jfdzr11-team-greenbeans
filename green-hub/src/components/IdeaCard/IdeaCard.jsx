import React, { useEffect, useRef } from "react";
import styles from "./IdeaCard.module.css";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { toast } from "react-hot-toast";

const IdeaCard = ({ id, user, idea, date }) => {
  const [isInEdition, setIsInEdition] = useState(false);

  const textArea = useRef(null);
  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
      console.log(textArea.current);
    }
  }, [textArea.current]);

  // USUWANIE POMYSŁU
  const handleDelete = (id) => {
    const docRef = doc(db, "ideas", id);
    deleteDoc(docRef);
  };

  // EDYCJA POMYSŁU

  const handleEdit = (id) => {
    setIsInEdition(true);
  };
  const handleCancel = (id) => {
    setIsInEdition(false);
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setIsInEdition(false);
    console.log(e.target.ideaToEdit.value);
    const docRef = doc(db, "ideas", id);

    try {
      await updateDoc(docRef, { idea: e.target.ideaToEdit.value });
      toast.success("Changes saved");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.ideaCard}>
      <div className={styles.user}>
        <span>{user}</span>
        <span>{date}</span>
      </div>
      {!isInEdition && (
        <>
          <p>{idea}</p>
          <div className={styles.btn}>
            <button onClick={handleEdit}>EDIT</button>
            <button onClick={() => {handleDelete(id);}}>DELETE</button>
          </div>
        </>
      )}

      <form
        style={{ display: `${isInEdition ? "block" : "none"}` }}
        onSubmit={(e) => handleUpdate(e, id)}>
        <textarea
          ref={textArea}
          className={styles.edition}
          name="ideaToEdit"
          id="ideaToEdit"
          type="text"
          defaultValue={idea}
        ></textarea>
        <div className={styles.btn}>
          <button>CHECK</button>
          <button type="button" onClick={handleCancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default IdeaCard;
