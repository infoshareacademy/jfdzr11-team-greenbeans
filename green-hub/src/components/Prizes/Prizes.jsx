import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import styles from './Prizes.module.css'
import PrizesBox from '../PrizesBox/PrizesBox'
import data from './PrizesData.json'

const Prizes = () => {

  return (
    <div className={styles.prizes}>
        <Navbar/>
        <main>
          <h1>prize</h1>
          <p>it's win win situation, look what we prepared for U</p>
          <div className={styles.prizeBox}>
            {data.map((prize, index) => {
              return (
                <PrizesBox 
                key={index}
                logo={prize.logo}
                prize={prize.prize}
                points={prize.points}
                value={prize.value}/>
              )
            })}
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Prizes