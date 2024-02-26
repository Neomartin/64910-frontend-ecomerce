import Banner from "../../layout/Banner/Banner";
import { ProductCardsContainer } from "../../ProductCardsContainer/ProductCardsContainer";

export default function Home() {
	return (
		<>
			<Banner />
			<div className="main-container">
				<ProductCardsContainer />
			</div>
		</>
	);
}
