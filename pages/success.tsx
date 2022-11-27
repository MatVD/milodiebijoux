import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import styles from '../styles/Success.module.css';

import { useStateContext } from '../context/context';
import { runFireworks } from '../lib/utils'
import Button from '../components/Button';
import { useRouter } from 'next/router';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const router = useRouter()

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className={styles.successWrapper}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Merci beaucoup pour votre commande!</h2>
        <p className={styles.emailMsg}>Votre facture se trouvera dans votre boite mail.</p>
        <p className={styles.description}>
          Si vous avez des questions : 
          <a className={styles.email} href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
          <Button label={'Continuer mes achats'} onClick={() => router.push('/')}/>
      </div>
    </div>
  )
}

export default Success