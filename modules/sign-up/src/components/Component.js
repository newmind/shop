
import React from 'react';

import SignUpForm from './Form';

import styles from './default.module.scss';


function Component({ signUp }) {
  function handleSubmit(formData) {
    signUp(formData);
  }

  return (
    <section className={styles['wrapper']}>
      <div className={styles['content']}>
        <header className={styles['header']}>
          <h2 className={styles['title']}>Регистрация</h2>
        </header>
        <SignUpForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
}

export default Component;
