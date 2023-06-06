import React, { useState, useEffect } from "react";
import "../../assets/styles/authenticationStyles/AuthHero.scss";
import { images, heroData } from "../../staticDB/authData";
import { useLocation, Link } from "react-router-dom";

const AuthHero: React.FC = () => {
    const location = useLocation();
    const [bgImage, setBgImage] = useState({});
    const [msgIndex, setMsgIndex] = useState(0);

    const messages = heroData.messages;
    const title = heroData.title;

    useEffect(() => {
        const randomImgIndex = Math.floor(Math.random() * images.length);
        const randomMsgIndex = Math.floor(Math.random() * messages.length);
        const bgImage = {
            backgroundImage: `url(${images[randomImgIndex]})`,
        };
        setBgImage(bgImage);
        setMsgIndex(randomMsgIndex);
    }, [messages.length]);

    return (
        <div className="auth-hero" style={bgImage}>
            <Link to="/">
                <h1
                    style={
                        location.pathname === "/login"
                            ? { right: 35, textAlign: "right" }
                            : { left: 35, textAlign: "left" }
                    }
                >
                    {title}
                </h1>
            </Link>
            <div
                className="authMessage"
                style={
                    location.pathname === "/login"
                        ? { right: 35, textAlign: "right" }
                        : {
                              left: `calc((100% - 785px) / 2)`,
                              textAlign: "right",
                          }
                }
            >
                {messages[msgIndex]}
            </div>
        </div>
    );
};

export default AuthHero;
