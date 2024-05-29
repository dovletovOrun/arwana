import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/admin/categories';
import PageWrapper from '../../components/PageWrapper';
import ProductGrid from '../../components/ProductGrid';

import styles from './all-cats.module.scss';

import brand1 from '../../assets/brand/brand1.png';
import { t } from 'i18next';

const animatedText = 'menu.categories';
const animationDelay = 150;

export default function AllCategories() {
	const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
	// const dispatch = useDispatch();

	// const categories = useSelector((state) => state.categories.categories);

	// useEffect(() => {
	// 	dispatch(getCategories());
	// }, [dispatch]);

	return (
		<PageWrapper>
			<div className={styles.categoryContainer}>
				<div
					style={{
						background: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${brand1})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
					className={styles.categoryMain}
				>
					<div className={styles.titleContainer}>
						{!isTablet && (
							<div>
								<h1 className={styles.mainText}>
									{t(animatedText)
										.split('')
										.map((char, i) => {
											return (
												<motion.div
													animate={{
														opacity: [0, 1],
														translateY: [100, 0],
													}}
													transition={{
														duration: 0.8,
														delay:
															(animationDelay +
																i * 20) /
															1000,
													}}
													key={char + i}
												>
													{char}
												</motion.div>
											);
										})}
								</h1>
							</div>
						)}
						<h3 className={styles.secondaryText}>Arwana mebel</h3>
						{isTablet && (
							<h2 className={styles.resTitle}>{animatedText}</h2>
						)}
					</div>
				</div>

				<ProductGrid
					isAllCats={true}
					sectionTitle={t('menu.categories')}
					// tabs={categories}
				/>
			</div>
		</PageWrapper>
	);
}
