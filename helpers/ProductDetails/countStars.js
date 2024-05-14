export function countStars(singleProduct) {
    const rating = singleProduct?.rating?.rate
    if (rating) {
        let fullStars = [];
        let emptyStarsCount;
        let emptyStarsArr = []
        for (let i = 0; i < Math.round(rating); i++) {
            fullStars.push(<svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-400"
                viewBox="0 0 24 24"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>)
        }
        emptyStarsCount = 5 - fullStars.length;
        for (let i = 0; i < Math.round(emptyStarsCount); i++) {
            emptyStarsArr.push(<svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>)
        }
        return { fullStars, emptyStarsArr }
    }
}