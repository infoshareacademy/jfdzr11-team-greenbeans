import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "../Faq/Faq.module.css";

const Faq = () => {
  return (
    <div className={styles.faq_container}>
      <div className={styles.navbar_container}>
        <Navbar />
      </div>

      <div className={styles.question_container}>
        <ol>
          <li>What does Green hub do?</li>
          <p>
            <b>
              It allows You to gather points for many activities that help our
              planet. All activities can be found in Gather Points section.
            </b>
          </p>
          <li>How can I get points?</li>
          <p>
            <b>
              Submit Your activities, for example riding 10 km by bike in Gather
              Points section. After validation they will be automaticly added to
              Your account.
            </b>
          </p>
          <li>How can I spend my points?</li>
          <p>
            <b>
              Head to Prizes section. There, You can select certain prizes for
              different ammount of points. After selecting specific prize, Your
              points will be taken automaticly, and we will generate individual
              code for being used with our partners.
            </b>
          </p>
          <li>Are the prizes single use only?</li>
          <p>
            <b>
              The code You generated can be used once. You can generate new one
              when You have enough points.
            </b>
          </p>
          <li>How can I add my own idea to be considered within app?</li>
          <p>
            <b>
              Head to New Ideas section. There, together with other users You
              can submit Your own idea to save our planet. Our company will
              consider these ideas, that will gather most reactions from
              registered users.
            </b>
          </p>
          <li>
            I cant add any new ideas, or submit my activities, and prizes are
            locked, why?
          </li>
          <p>
            <b>You need to be registered and logged in user to do so.</b>
          </p>
          <li>How can I register?</li>
          <p>
            <b>
              Head to register button, then submit Your required data. After
              doing so, Your account will be created.
            </b>
          </p>
          <li>How can I log in?</li>
          <p>
            <b>
              Head to login button, enter Your login data. Site will redirect
              You automaticly.
            </b>
          </p>
          <li>I have a problem with application, how can I contact You?</li>
          <p>
            <b>
              Head to section Contact us on the bottom part of the App. There
              You will be able to submit form that we will recieve.
            </b>
          </p>
          <li>
            I'm representing company, that would like to join Your program to
            save our planet. How can we do that?
          </li>
          <p>
            <b>
              As before, go to Contact us, fill Your data, and remember to
              choose from list, that You are a business partner.
            </b>
          </p>
        </ol>
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default Faq;
