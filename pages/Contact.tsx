import Link from "next/link";
import React from "react";
import styles from "../styles/Contact.module.css"

const Contact = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Contact</h1>
      <h2>Pour toutes questions ou commandes, voici mes coordonées :</h2>
      <br /><br />
      <p className={styles.contactName}>Emilie Laviollette</p>
      <p>Adressse postale</p>
      <p>Code Postale et ville</p>
      <br />
      <p>Ou au 06.12.34.56.78</p>
      <br />
      <p>
        Ou en cliquant ici :{" "}
        <Link href="mailto: exemple@mail.com">exemple@mail.com</Link>
      </p>
    </div>
  );
};

export default Contact;
