import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ShowRoom from '../../components/ShowRoom';
import PageWrapper from '../../components/PageWrapper';
import Inputs from '../../components/Inputs';

import styles from './contact.module.scss';

import logo from '../../assets/logo/camel.png';
import name from '../../assets/logo/name.png';

export default function Contact() {
	const { t } = useTranslation();
	return (
		<PageWrapper>
			<div className={styles.contactContainer}>
				<div className={styles.textWrapper}>
					<h1 className={styles.contactMainText}>
						{t('menu.requestinfo')}
					</h1>
				</div>

				<Inputs />

				{/* <div className={styles.contactSection}>
					<div className={styles.logoCol}>
						<img className={styles.camel} src={logo} alt="arwana" />
						<img src={name} alt="arwana" />
					</div>
					<div className={styles.contactCol}>
						<h3>
							<strong>{t('contact.headquarters')}</strong>
						</h3>
						<p>
							{t('footer.address')} <br /> 73/1 Ashgabat,
							Turkmenistan
						</p>
						<p>
							<em>T.</em>
							+ 45-69-99
							<br />
							<em>Т.</em>+ 993 61640417
						</p>
						<p>info.arwana.mebel@gmail.com</p>
					</div>
				</div> */}
			</div>
		</PageWrapper>
	);
}
