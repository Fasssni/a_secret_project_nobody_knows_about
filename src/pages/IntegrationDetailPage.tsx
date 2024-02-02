import { useNavigate, useParams } from "react-router-dom";
import { Telegram } from "../components/Telegram/Telegram";
import { useStoreContext } from "../store/api";

export const IntegrationDetailPage = () => {
  const { integration } = useParams<{ integration: string }>();
  const { isAuth } = useStoreContext();
  const navigate = useNavigate();
  const Integrations: Record<string, React.FC> = {
    tg: Telegram,
    instagram: () => (
      <div className="upcoming">
        Insatgram integration is coming soon... Stay tuned🤝
      </div>
    ),
    waba: () => (
      <div className="upcoming">
        WABA integration is coming soon... Stay tuned🤝
      </div>
    ),
    gmail: () => (
      <div className="upcoming">
        Gmail integration is coming soon... Stay tuned🤝
      </div>
    ),
  };

  const SelectedIntegration = Integrations[integration!.toLowerCase()];

  return (
    <div className="in_details_main">
      {isAuth ? (
        SelectedIntegration ? (
          <SelectedIntegration />
        ) : (
          "Integration Not Found :("
        )
      ) : (
        <h2>
          Please{" "}
          <span
            style={{ color: "#5871EB", cursor: "pointer" }}
            onClick={() => navigate("../../login")}
          >
            Sign In
          </span>{" "}
          first
        </h2>
      )}
    </div>
  );
};
