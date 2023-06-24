import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <ul>
           <li>articles</li>
           <li>points</li>
           <li>new ideas</li>
           <li>prize</li> 
        </ul>
        <div>
            <p>Your points: 750</p>
        </div>
    </div>
  )
}

export default Navbar