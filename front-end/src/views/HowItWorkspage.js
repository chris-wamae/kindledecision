import { useState } from "react";
import "../styles/HowItWorkspage.css"
function HowItWorkspage() {

    const [hideText, setHideText] = useState(true);
    const [hideTextTwo, setHideTextTwo] = useState(true);
    const [hideTextThree, setHideTextThree] = useState(true);

    return (
        <>
            <section>
                <div className="how-it-works-title">How it works</div>
                <div>
                    <div>
                        <div className="single-hiw-element">
                            <div>Creating an account/login</div>

                            <img src="download.png" onClick={() => setHideText(!hideText)}></img>
                        </div>
                        <div id={hideText ? "hide-text" : ""} className="hiw-text">
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                        </div>
                    </div>

                    <div className="single-hiw-element" id="middle-hiw-element">
                        <div>Participating in voting</div>
                        <img src="download.png" onClick={() => setHideTextTwo(!hideTextTwo)}></img>
                        <div id={hideTextTwo ? "hide-text" : ""} className="hiw-text">
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                        </div>
                    </div>

                    <div className="single-hiw-element">
                        <div>Email notifications</div>
                            <img src="download.png" onClick={() => setHideTextThree(!hideTextThree)}></img>
                            <div id={hideTextThree ? "hide-text" : ""} className="hiw-text">
                                The quick brown fox jumped over the lazy dog.
                                The quick brown fox jumped over the lazy dog.
                                The quick brown fox jumped over the lazy dog.
                                The quick brown fox jumped over the lazy dog.
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HowItWorkspage;