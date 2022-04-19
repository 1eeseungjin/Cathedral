import DefaultImage from '../../../../@static/image/defaultProfile.png';
import './index.scss';

const Chat = ({ data }) => {
  return (
    <>
      <div className="chat">
        <div className="chat-profile">
          <img src={DefaultImage} />
        </div>

        <div className="chat-content">
          <div className="chat-content-name">
            {data.name} ({data.baptismal})
          </div>
          <div className="chat-content-chat">{data.chat}</div>
        </div>
      </div>
    </>
  );
};

export default Chat;
