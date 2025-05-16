import { Link } from "react-router-dom";
import "../styles/nonfound.css";
import { useTranslation } from "react-i18next";
import StarsOverlay from "../components/StarsOverlay";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <>
            <StarsOverlay />
            <div className="notfound-container">
                <h1>{t("notfound.title")}</h1>
                <p>{t("notfound.message")}</p>
                <Link to="/" className="home-link">
                    {t("notfound.button")}
                </Link>
            </div>
        </>
    );
};

export default NotFound;