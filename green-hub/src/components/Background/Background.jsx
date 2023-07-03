// import React, { useState } from 'react'
import styles from './Background.module.css'
import useAuth from '../../context/AuthContext'
import { UseUserPoints } from '../Utils/UseUserPoints/UseUserPoints'

const items = [styles.cloud, styles.cloud, styles.cloud, styles.garbage, styles.garbage1, styles.plant, styles.trash ]
const items1 = [styles.cloud, styles.cloud, styles.garbage, styles.garbage1, styles.plant, styles.garbage2 ]
const items2 = [styles.cloud, styles.cloud, styles.garbage, styles.garbage1, styles.plant, styles.bin ]
const items3 = [styles.cloud, styles.cloud, styles.tree, styles.plant, styles.bin ]
const items4 = [styles.cloud, styles.sun, styles.tree, styles.plant, styles.tree1 ]
const items5 = [styles.sun, styles.tree, styles.plant, styles.tree1, styles.tree2 ]

const Background = () => {

    const {currentUser} = useAuth()
    const { userPoints } = UseUserPoints();

    const getBackground = () => {
        if(userPoints > 200 && userPoints <= 400) { return items1} 
        else if( userPoints > 400 && userPoints <= 700 ) { return items2}
        else if( userPoints > 700 && userPoints <= 1000 ) { return items3}
        else if( userPoints > 1000 && userPoints <= 1300 ) { return items4}
        else if( userPoints > 1300 ) { return items5}
          else {
            return items
        }
    }
    
  return (
    <div className={styles.container}>
    {currentUser?.uid ? (<div className={styles.background}>
        { getBackground().map((item, index) => {
            return (
                <div key={index} className={item}></div>
            )
        })}
        <p className={styles.para}>I need help! THANK U for being here!</p>
    </div>) : (<div className={styles.background}>
        { getBackground().map((item, index) => {
            return (
                <div key={index} className={item}></div>
            )
        })}
        <p className={styles.para}>I need help! THANK U for being here!</p>
    </div>)}
    </div>
  )
}

export default Background