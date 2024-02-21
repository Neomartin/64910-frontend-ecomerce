import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getProductDetail();
	}, [id]);

	async function getProductDetail(id) {
		console.log(id);
	}
	return (
		<div>
			ProductDetail
			<div>{id}</div>
		</div>
	);
};
