import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../store/api";
import cl from "./Telegram.module.css";
import { useState, FormEvent, useRef } from "react";

type BotProps = {
  name: string;
  id: number;
};

type ModalProps = {
  name?: string;
  handleModalClose: () => void;
};

export const Telegram = () => {
  const { createTgBot } = useStoreContext();
  const [token, setToken] = useState<Record<string, string>>({
    token: "",
    greeting: "",
  });
  const [error, setError] = useState<string>("");
  const [botData, setBotData] = useState<BotProps>();
  const [modalOk, setModalOk] = useState<boolean>(false);

  const tokenRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (token.token.length > 43) {
      try {
        const response = await createTgBot(token.token, token.greeting);
        setToken({ token: "", greeting: "" });
        setBotData(response);
        setModalOk(true);
      } catch (e: any) {
        setError(e?.message);
      }
    } else {
      setError("The token doesn't seem to be valid :(");
    }
  };

  const handleModalClose = () => {
    setModalOk(false);
  };

  return (
    <div className={cl.tg_main} onSubmit={(e) => onSubmitHandler(e)}>
      {modalOk && (
        <ModalOk name={botData?.name} handleModalClose={handleModalClose} />
      )}
      <h3>
        Connect your <span style={{ color: "#5871EB" }}>Telegram</span>
      </h3>
      <form className={cl.bot_data}>
        <input
          className={cl.bot_credentials}
          placeholder="Bot token"
          onChange={(e) =>
            setToken((state) => {
              return { ...state, token: e.target.value };
            })
          }
          value={token.token}
          ref={tokenRef}
        />
        <input
          className={cl.bot_credentials}
          placeholder="Greeting (optional)"
          onChange={(e) =>
            setToken((state) => {
              return { ...state, greeting: e.target.value };
            })
          }
        />
        <button className={cl.submit_btn}>Connect</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={cl.bot_description}>
          <h3>To set this up do the following:</h3>
          <ol className={cl.bot_desc_ol}>
            <li className={cl.bot_desc_li}>
              1.Got to{" "}
              <a href="https://telegram.me/botfather" target="_blank">
                link
              </a>
            </li>
            <li className={cl.bot_desc_li}>
              2.Create your bot and paste the token{" "}
              <a onClick={() => tokenRef.current?.focus()}>here</a>
            </li>
            <li className={cl.bot_desc_li}>
              3.Click "Connect" and get rolling!
            </li>
          </ol>
        </div>
      </form>
    </div>
  );
};

const ModalOk = ({ name, handleModalClose }: ModalProps) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/inbox");
  };
  return (
    <div className={cl.modal_main} onClick={() => handleModalClose()}>
      <div className={cl.modal_container} onClick={(e) => e.stopPropagation()}>
        <p>
          The bot <span>@{name}</span> has successfully been added
        </p>
        <p>
          It's now ready to recieve messages at the{" "}
          <a onClick={handleNav}>Inbox</a>
        </p>
      </div>
    </div>
  );
};
