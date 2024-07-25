

interface AdvertisementProps {
    size: 'full' | 'two' | 'three' | 'four';
    image? : string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ size = 'full',image }) => {

    switch (size) {
        case 'full':
            return (
                <div className="fullWidth flex justify-center items-center">
                    <img src={image} alt="Christmas Discount" className="w-full h-full object-cover" />
                </div>
            );
        case 'two':
            return (
                <div className="fullWidth flex justify-center items-center">
                    <img src={image} alt="Christmas Discount" className="w-full h-full object-cover" />
                </div>
            );
    }
}

export default Advertisement;