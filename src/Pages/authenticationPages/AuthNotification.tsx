import { AuthHeaderText } from "../../components/authComponents/AuthHeaderText";
import '../../assets/styles/authenticationStyles/AuthNotification.scss';
import { textProps } from "../../staticDB/authData";

const AuthNotification: React.FC = () => {
    return (
        <>
            <AuthHeaderText />
            <div className="authentication">
                <h3 className="note-header">{textProps.notificationHeader}</h3>
                <p className="note-text" id="text1">{textProps.emailPrompt}</p>
            </div>
        </>
    )
}

export default AuthNotification;