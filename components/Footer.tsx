import styles from '@/styles/footer.styles.module.scss';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <p className={styles.footer__title}>To-do-list с использованием Next.js</p>
            <div className={styles.footer__panel}>
                <p className={styles.footer__copyright}>&copy; {currentYear}</p>
                <ul className={styles.footer__links}>
                    <li className={styles.footer__item}>
                        <a className={styles.footer__link}
                            href='https://t.me/avibus_bonis_2022'
                            target='_blank'
                            rel='noopener noreferrer'>Telegram</a>
                    </li>
                    <li className={styles.footer__item}><a className={styles.footer__link}
                        href='https://github.com/Alexashka-2022'
                        target='_blank'
                        rel='noopener noreferrer'>Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;