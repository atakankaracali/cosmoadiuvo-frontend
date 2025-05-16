import '../styles/RetroTable.css';
import { useTranslation } from 'react-i18next';
import { RetrogradeData, RetrogradeItem } from '../types/retrograde';

interface Props {
  retrogrades: RetrogradeData;
}

const RetroTable: React.FC<Props> = ({ retrogrades }) => {
  const { t } = useTranslation();
  const effectsMap: { [key: string]: string } = {
    "Communication and travel delays, misunderstandings. Review action and reflection. Rethink communication, self-advocacy, and processing emotions.":
      "retrogradelist.effectsTexts.communication_issues",
    "Miscommunications, travel plan issues. Double-check details. Review self-expression and boldness.":
      "retrogradelist.effectsTexts.leo_travel_issues",
    "Reassess beliefs and partnerships involving finances or intimacy. Uncover hidden truths, transform outdated perspectives.":
      "retrogradelist.effectsTexts.sag_partnerships",
    "General communication and technology disruptions.":
      "retrogradelist.effectsTexts.general_disruption",
    "Re-evaluate life path, relationships, and boundaries. Reflect on desires, beauty, worthiness, love, and creativity. Release past hurts.":
      "retrogradelist.effectsTexts.venus_reevaluate_love",
    "Revisit power dynamics, intimacy, balance, and harmony in relationships.":
      "retrogradelist.effectsTexts.venus_power_dynamics",
    "Re-evaluate communication and intellectual connection in relationships.":
      "retrogradelist.effectsTexts.venus_comm_connection",
    "Reconsider commitment and values related to career and stability in relationships.":
      "retrogradelist.effectsTexts.venus_commitment_career",
    "Reassess personal goals, motivation, and self-expression. Process anger and desires, focus on strategy and family matters.":
      "retrogradelist.effectsTexts.mars_goals_motivation",
    "Re-evaluate energy towards work and health. Revisit creativity and self-expression.":
      "retrogradelist.effectsTexts.mars_health_creativity",
    "Reconsider assertiveness and balance in relationships. Re-evaluate impact on work, health, and routines.":
      "retrogradelist.effectsTexts.mars_assertiveness",
    "Review communication, learning, travel plans, and intellectual pursuits.":
      "retrogradelist.effectsTexts.jupiter_comm_learning",
    "Re-evaluate luck and expansion in home, family, and emotional security.":
      "retrogradelist.effectsTexts.jupiter_home_family",
    "Re-evaluate luck and expansion in creativity, self-expression, and romance.":
      "retrogradelist.effectsTexts.jupiter_creativity",
    "Re-evaluate luck and expansion in work, health, and service.":
      "retrogradelist.effectsTexts.jupiter_health_service",
    "Re-evaluate luck and expansion in relationships, balance, and harmony.":
      "retrogradelist.effectsTexts.jupiter_relationships",
    "Re-evaluate responsibilities and limitations in dreams, spirituality, and the subconscious.":
      "retrogradelist.effectsTexts.saturn_dreams",
    "Reconsider responsibilities in communication, intellect, stability, security, and values.":
      "retrogradelist.effectsTexts.saturn_communication",
    "Re-evaluate responsibilities and limitations in self and assertiveness.":
      "retrogradelist.effectsTexts.saturn_assertiveness",
    "Reconsider responsibilities and limitations in stability, security, and values.":
      "retrogradelist.effectsTexts.saturn_stability",
    "Re-evaluate responsibilities and limitations in communication and intellect.":
      "retrogradelist.effectsTexts.saturn_comm_intellect",
    "Reconsider responsibilities and limitations in home, family, and emotional security.":
      "retrogradelist.effectsTexts.saturn_family",
    "Re-evaluate security, finances, self-worth, individuality, and connection to the planet.":
      "retrogradelist.effectsTexts.uranus_finance_self",
    "Intensified intuition, review dreams and desires. Illusions may fade, revealing reality. Healing old wounds.":
      "retrogradelist.effectsTexts.neptune_dreams",
    "More assertive and individual approach to dreams and spiritual pursuits. Blurring of lines between idealism and personal efforts.":
      "retrogradelist.effectsTexts.neptune_assertive_dreams",
    "Effects on dreams and spiritual pursuits with a focus on individual identity.":
      "retrogradelist.effectsTexts.neptune_identity_focus",
    "Inner dilemmas between old systems and new visions. Re-evaluate personal power and role in the collective.":
      "retrogradelist.effectsTexts.pluto_power_dilemma",
    "Re-evaluate personal power, role in the collective, and challenging old systems.":
      "retrogradelist.effectsTexts.pluto_power_collective"
  };
  const zodiacTranslationMap: { [key: string]: string } = {
    Aries: t("astroform.sunSigns.Aries"),
    Taurus: t("astroform.sunSigns.Taurus"),
    Gemini: t("astroform.sunSigns.Gemini"),
    Cancer: t("astroform.sunSigns.Cancer"),
    Leo: t("astroform.sunSigns.Leo"),
    Virgo: t("astroform.sunSigns.Virgo"),
    Libra: t("astroform.sunSigns.Libra"),
    Scorpio: t("astroform.sunSigns.Scorpio"),
    Sagittarius: t("astroform.sunSigns.Sagittarius"),
    Capricorn: t("astroform.sunSigns.Capricorn"),
    Aquarius: t("astroform.sunSigns.Aquarius"),
    Pisces: t("astroform.sunSigns.Pisces")
  };


  return (
    <div className="retro-table-container">
      {Object.keys(retrogrades).map((planetKey) => {
        const planetData = retrogrades[planetKey as keyof RetrogradeData]; // Tür dönüşümü burada

        if (planetData && planetData.length > 0) {
          return (
            <div key={planetKey} className="planet-retrogrades">
              <h2>{t(`retrogradelist.${planetKey}`)}</h2>
              <table>
                <thead>
                  <tr>
                    <th>{t('retrogradelist.startDate')}</th>
                    <th>{t('retrogradelist.endDate')}</th>
                    <th>{t('retrogradelist.zodiacSigns')}</th>
                    <th>{t('retrogradelist.effects')}</th>
                  </tr>
                </thead>
                <tbody>
                  {planetData.map((retrograde: RetrogradeItem, index) => (
                    <tr key={`${planetKey}-${index}`}>
                      <td data-column={t('retrogradelist.startDate')}>{retrograde.start_date}</td>
                      <td data-column={t('retrogradelist.endDate')}>{retrograde.end_date}</td>
                      <td data-column={t('retrogradelist.zodiacSigns')}>
                        {retrograde.zodiac_signs.map((sign) => zodiacTranslationMap[sign] || sign).join(', ')}
                      </td>
                      <td
                        data-column={t('retrogradelist.effects')}
                        className="effects-cell"
                      >
                        {t(effectsMap[retrograde.effects] || retrograde.effects)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default RetroTable;