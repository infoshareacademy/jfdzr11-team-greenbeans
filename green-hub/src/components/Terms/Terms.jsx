import styles from "../Terms/Terms";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Terms = () => {
  return (
    <div className={styles.terms_container}>
      <div className={styles.navbar_container}>
        <Navbar />
      </div>
      <div className={styles.text_container}>
        <h1 className={styles.header}>
          Terms and Conditions for <b>Green Hub</b>
        </h1>
        <h2>
          Last Updated:
          <b> 08.07.2023</b>
        </h2>
        <p>
          Acceptance of Terms By downloading, accessing, or using{" "}
          <b>Green Hub</b> (referred to as{" "}
          <b>
            <i>the App</i>
          </b>
          ), you agree to be bound by these Terms and Conditions. If you do not
          agree to these terms, please do not use the App.
        </p>
        <ul>
          Points system
          <li>
            The App offers a points system that rewards users for engaging in
            eco-friendly activities, such as recycling, reducing waste, or
            taking environmentally conscious actions.
          </li>
          <li>
            Points earned in the App have no monetary value and cannot be
            redeemed for cash or transferred to other users.
          </li>
          <li>
            The App reserves the right to modify or terminate the points system
            at any time without prior notice.
          </li>
        </ul>
        <ul>
          User Conduct
          <li>
            Users of the App must comply with all applicable laws and
            regulations.
          </li>
          <li>
            Users are responsible for the accuracy and truthfulness of any
            information provided to the App.
          </li>
          <li>
            Users must not engage in any fraudulent, illegal, or unauthorized
            activities while using the App.
          </li>
        </ul>
        <ul>
          Privacy and Data Collection
          <li>
            The App collects and processes personal data in accordance with its
            Privacy Policy.
          </li>
          <li>
            By using the App, you consent to the collection, storage, and
            processing of your personal data as described in the Privacy Policy.
          </li>
        </ul>
        <ul>
          Intellectual Property
          <li>
            All intellectual property rights related to the App, including but
            not limited to trademarks, logos, and content, are owned by or
            licensed to Green Hub.
          </li>
          <li>
            Users are prohibited from copying, distributing, or using any
            intellectual property of the App without prior written consent.
          </li>
        </ul>
        <ul>
          Limitation of Liability
          <li>
            The App is provided on an "as is" basis without warranties of any
            kind, including but not limited to fitness for a particular purpose
            or non-infringement.
          </li>
          <li>
            Green Hub shall not be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from the use or inability
            to use the App.
          </li>
        </ul>
        <ul>
          Modifications to Terms and Conditions
          <li>
            Green Hub reserves the right to modify or update these Terms and
            Conditions at any time. Users will be notified of any changes, and
            continued use of the App after modifications constitute acceptance
            of the updated terms.
          </li>
        </ul>
        <ul>
          Governing Law
          <li>
            Governing Law These Terms and Conditions shall be governed by and
            construed in accordance with the laws of Poland. Any disputes
            arising from the App or these terms shall be subject to the
            exclusive jurisdiction of the courts in Okręgowy Sąd Administracyjny
            w Gdańsku.
          </li>
        </ul>
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default Terms;
