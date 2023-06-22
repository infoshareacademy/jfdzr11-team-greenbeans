import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <li>FAQ</li>
        <li>About</li>
        <li>Therms and conditions</li>
      </ul>
      <ul>
        <li>Contact us</li>
        <li>Support</li>
      </ul>
    </div>
  )
}

export default Footer