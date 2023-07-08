import React, { useEffect, useRef } from "react";
import styles from "./IdeaCard.module.css";
import { useState } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";

const IdeaCard = ({ id, user, idea, date, auth, totalLikes, usersLikes }) => {
  // stan edit - określa czy komponent ma możliwość edycji, tzn. czy dany komponent został stworzony przez aktulanie zalogowanego użytkownika
  // stan isInEdition - określa komponent aktualnie jest wyświetlany czy podlega edycji

  const [edit, setEdit] = useState(false);
  const [isInEdition, setIsInEdition] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if(usersLikes.includes(currentUser.uid)) { setIsLiked(true)}
  }, [])

  const editBtn = () => {
    setEdit(true);
  };

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
    setEdit(false);
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    setIsInEdition(false);
    setEdit(false);
    console.log(e.target.ideaToEdit.value);
    const docRef = doc(db, "ideas", id);

    try {
      await updateDoc(docRef, { idea: e.target.ideaToEdit.value });
      console.log(auth)
      toast.success("Changes saved");
    } catch {
      toast.error("Something went wrong");
    }
  };

  // LAJKI

  const getLike = async (id) => {
    const docRef = doc(db, "ideas", id);
    console.log(docRef)
    setIsLiked(!isLiked);

    if (!isLiked) {
      try {
        await updateDoc(docRef, { totalLikes: Number(totalLikes) + 1, usersLikes: [...usersLikes, currentUser.uid] });
        console.log(usersLikes, currentUser.uid)
      } catch {
        console.log("nie udało się");
      }
    } else {
      try {
        await updateDoc(docRef, { totalLikes: Number(totalLikes) - 1, usersLikes: [...usersLikes].filter(userId => userId !== currentUser.uid) });
      } catch {
        console.log("nie udało się");
      }
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
            {currentUser?.uid === auth ? (
              !edit && (
                <div>
                  <div>
                    <button
                      className={`${styles.iconBtn} ${
                        isLiked ? styles.hasLike : styles.doesntHaveLike
                      }`}
                      onClick={() => getLike(id)}
                    ></button>
                    <span>{totalLikes !== 0 ? totalLikes : null}</span>
                  </div>
                  <button className={styles.iconBtn} onClick={editBtn}></button>
                </div>
              )
            ) : (
              <div className={styles.othercomments}>
                <button
                  disabled={!currentUser?.uid}
                  className={`${styles.iconBtn} ${
                    isLiked ? styles.hasLike : styles.doesntHaveLike
                  }`}
                  onClick={() => getLike(id)}
                ></button>
                <span>{totalLikes !== 0 ? totalLikes : null}</span>
              </div>
            )}
            {edit && (
              <>
                <button onClick={handleEdit}>EDIT</button>
                <button
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  DELETE
                </button>
                <button className={styles.cancel} onClick={handleCancel}>
                  ✖
                </button>
              </>
            )}
          </div>
        </>
      )}

      <form
        style={{ display: `${isInEdition ? "block" : "none"}` }}
        onSubmit={(e) => handleUpdate(e, id)}
      >
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
          <button type="button" onClick={handleCancel}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdeaCard;
