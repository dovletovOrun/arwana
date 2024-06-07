import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

import PageWrapper from '../../components/PageWrapper';
import ProductGrid from '../../components/ProductGrid';


import styles from './allbrands.module.scss';

import main1 from "../../assets/brand/brand1.png"
import { getAllBrandsApi } from '../../Services/GetAllBrands';


const animatedText = 'Бренды';
const animationDelay = 150;

export default function AllBrands() {

	const {data: brandData} = getAllBrandsApi.useGetAllBrandsDataQuery()
	const {data: brandsPageImage} = getAllBrandsApi.useGetAllBrandsPageImageDataQuery()
	console.log(brandData);
	const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

	const { t } = useTranslation();


	return (
		<PageWrapper>
			<div className={styles.categoryContainer}>
				<div
					style={{
						backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${brandsPageImage?.image?.length > 0
							? brandsPageImage.image
							: main1})`,
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
									{animatedText.split('').map((char, i) => {
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
					sectionTitle={t('menu.brands')}
					tabs={brandData}
				/>
			</div>
		</PageWrapper>
	);
}
