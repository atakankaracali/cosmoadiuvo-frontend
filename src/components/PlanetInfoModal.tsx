import "../styles/modal.css";
import { useTranslation } from "react-i18next";

type Props = {
  planet: string;
  onClose: () => void;
};

const planetDetails: Record<string, any> = {
  Sun: {
    diameter: "1.39 million km",
    atmosphere: "Hydrogen, Helium",
    temperature: "5,500 °C",
  },
  Mercury: {
    diameter: "4,879 km",
    atmosphere: "Oxygen, sodium, hydrogen",
    temperature: "-180°C to 430°C",
  },
  Venus: {
    diameter: "12,104 km",
    atmosphere: "Carbon dioxide, sulfuric acid",
    temperature: "462°C",
  },
  Earth: {
    diameter: "12,742 km",
    atmosphere: "Nitrogen, oxygen",
    temperature: "−88°C to 58°C",
  },
  Mars: {
    diameter: "6,779 km",
    atmosphere: "Carbon dioxide, nitrogen",
    temperature: "−125°C to 20°C",
  },
  Jupiter: {
    diameter: "139,820 km",
    atmosphere: "Hydrogen, helium",
    temperature: "−145°C",
  },
  Saturn: {
    diameter: "116,460 km",
    atmosphere: "Hydrogen, helium",
    temperature: "−178°C",
  },
  Uranus: {
    diameter: "50,724 km",
    atmosphere: "Hydrogen, helium, methane",
    temperature: "−224°C",
  },
  Neptune: {
    diameter: "49,244 km",
    atmosphere: "Hydrogen, helium, methane",
    temperature: "−218°C",
  },
};

const PlanetInfoModal = ({ planet, onClose }: Props) => {
  const info = planetDetails[planet];
  const { t } = useTranslation();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">🪐 {t(`planetNames.${planet}`)}</h2>
        {info ? (
          <ul className="modal-list">
            <li>
              <strong>{t("planetModal.diameter")}:</strong> {info.diameter}
            </li>
            <li>
              <strong>{t("planetModal.atmosphere")}:</strong> {info.atmosphere}
            </li>
            <li>
              <strong>{t("planetModal.temperature")}:</strong> {info.temperature}
            </li>
          </ul>
        ) : (
          <p className="modal-empty">{t("planetModal.noData")}</p>
        )}
        <button onClick={onClose} className="modal-close">
          {t("planetModal.close")}
        </button>
      </div>
    </div>
  );
};

export default PlanetInfoModal;