import { RiStarSFill } from "react-icons/ri";

export function countStars(singleProduct) {
    const rating = singleProduct?.rating?.rate
    if (rating) {
        let fullStars = [];
        let emptyStarsCount;
        let emptyStarsArr = []
        for (let i = 0; i < Math.round(rating); i++) {
            fullStars.push(<RiStarSFill className="text-lg"/>)
        }
        emptyStarsCount = 5 - fullStars.length;
        for (let i = 0; i < Math.round(emptyStarsCount); i++) {
            emptyStarsArr.push(<RiStarSFill className="text-lg bg-white" />)
        }
        return { fullStars, emptyStarsArr }
    }
}