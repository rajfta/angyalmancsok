import logo from "~/assets/logo-without-text.png";

const Logo = () => {
    return (
        <a href="/">
            <div className="flex items-center justify-center">
                <img
                    className="h-24 w-24 object-contain"
                    src={logo.src}
                    alt="Angyalmancsok logo"
                />
                <div className="flex leading-tight flex-col">
                    <span>Angyalmancsok</span>
                    <span>Alapítvány</span>
                </div>
            </div>
        </a>
    );
};

export default Logo;
