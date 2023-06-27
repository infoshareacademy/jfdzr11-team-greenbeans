import React, { useEffect, useRef } from "react";
import styles from "./IdeaCard.module.css";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";

const IdeaCard = ({ id, user, idea, date, auth }) => {

  // stan edit - określa czy komponent ma możliwość edycji, tzn. czy dany komponent został stworzony przez aktulanie zalogowanego użytkownika
  // stan isInEdition - określa komponent aktualnie jest wyświetlany czy podlega edycji
  
  const [edit, setEdit] = useState(false)
  const [isInEdition, setIsInEdition] = useState(false);
  const { currentUser } = useAuth();

  const editBtn = () => {setEdit(true)}

  const textArea = useRef(null);
  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }
  }, [textArea.current]);

  // USUWANIE POMYSŁU
  const handleDelete = (id) => {
    const docRef = doc(db, "ideas", id);
    deleteDoc(docRef);
  };

  // EDYCJA POMYSŁU

  const handleEdit = () => {
    setIsInEdition(true);
  };
  const handleCancel = () => {
    setIsInEdition(false);
    setEdit(false)
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setIsInEdition(false);
    setEdit(false)
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
            {currentUser.uid === auth ? 
            !edit && 
            (<button onClick={editBtn}>edit</button>)
            : null}
            {edit && 
            (<>
            <button onClick={handleEdit}>EDIT</button>
            <button onClick={() => {handleDelete(id)}}>DELETE</button>
            <button onClick={handleCancel}>CANCEL</button>
            </>)}
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
