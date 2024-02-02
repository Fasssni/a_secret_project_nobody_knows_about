import styles from "./ChannelsPage.module.css";
import integrationsData from "../../utils/IntegrationData.json";

type ChannelsPageProps = {
  onClickHandler: (link: string) => void;
};

export const ChannelsPage = ({ onClickHandler }: ChannelsPageProps) => {
  return (
    <div className={styles.integratePage}>
      <h1>Integrations</h1>
      <div className={styles.integrationContainer}>
        {integrationsData.map((integration, index) => (
          <div
            key={index}
            className={styles.integrationCard}
            onClick={() => onClickHandler(integration.link)}
            aria-disabled={index !== 0}
            style={{
              opacity: index === 0 ? 1 : 0.5,
              cursor: index === 0 ? "pointer" : "default",
            }}
          >
            <img
              src={integration.imageUrl}
              alt={integration.title}
              className={styles.integrationIcon}
            />
            <h2 className={styles.integrationTitle}>{integration.title}</h2>
            <p className={styles.integrationDescription}>
              {integration.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
