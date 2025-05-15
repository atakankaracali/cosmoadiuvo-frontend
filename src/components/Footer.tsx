import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full text-center py-4 text-cosmosWhite text-sm opacity-50 font-orbitron">
      © {new Date().getFullYear()} CosmoAdiuvo — {t("footer.slogan")}
    </footer>
  );
};

export default Footer;
