import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const HomePage = () => {
    const [typeingStatus, setTypingStatus] = useState("human1");

    return (
        <div className="homepage">
            <img src="/orbital.png" alt="" className="orbital" />
            <div className="left">
                <h1>CHAT AI</h1>
                <h2>Supercharge your creativity and productivity</h2>
                <h3>
                    random random random randomrandom randomrandom randomrandom
                    randomrandom randomrandom random random randomrandom random
                </h3>
                <Link to="/dashboard">Get started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/bot.png" alt="" className="bot" />
                    <div className="chat">
                        <img
                            src={
                                typeingStatus === "human1"
                                    ? "/human1.jpeg"
                                    : typeingStatus === "human2"
                                    ? "/human2.jpeg"
                                    : "bot.png"
                            }
                            alt=""
                        />
                        <TypeAnimation
                            sequence={[
                                "Human: We produce food for Mince",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "Bot: We have foood for Pigs",
                                2000,
                                () => {
                                    setTypingStatus("human2");
                                },

                                "Human2: We produce food for Mince",
                                2000,
                                () => {
                                    setTypingStatus("bot");
                                },
                                "Bot2: We have foood for Pigs",
                                2000,
                                () => {
                                    setTypingStatus("human1");
                                },
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo.png" alt="" />
                <div className="links">
                    <Link to="/">Terms of Service</Link>
                    <span>|</span>
                    <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
