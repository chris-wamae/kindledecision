import { useState } from "react";
import "../styles/HowItWorkspage.css"
function HowItWorkspage() {

    const [hideText, setHideText] = useState(true);
    const [hideTextTwo, setHideTextTwo] = useState(true);
    const [hideTextThree, setHideTextThree] = useState(true);

    return (
        <>
            <section className="hiw-container">
                <div className="how-it-works-title">How it works</div>
                <div>
                    <div className="single-hiw-element">
                        <div>Creating an account/login</div>

                        <img src="download.png" onClick={() => setHideText(!hideText)}></img>
                    </div>
                    <div id={hideText ? "hide-text" : ""} className="hiw-text">
                      To use the application one must have an account. You only need to create an account once 
                      the first time you use the application. Any other time you will only need to sign in.
                    </div>

                    <div className="single-hiw-element" id="middle-hiw-element">
                        <div>Participating in queries</div>

                        <img src="download.png" onClick={() => setHideTextTwo(!hideTextTwo)}></img>
                    </div>
                    <div id={hideTextTwo ? "hide-text" : ""} className="hiw-text">
                   Participating in queries is easy. In your user dashboard, click on any query to open it. You will see the participate button which will take you to the participation page
                    </div>


                    <div className="single-hiw-element">
                        <div>Email notifications</div>

                        <img src="download.png" onClick={() => setHideTextThree(!hideTextThree)}></img>
                    </div>
                    <div id={hideTextThree ? "hide-text" : ""} className="hiw-text">
                     This feature is currently under development. It will allow the participants of a query to be emailed automatically.
                    </div>

                    {/* <div className="single-hiw-element" id="middle-hiw-element">
                        <div>
                            <div>Participating in voting</div>
                            <img src="download.png" onClick={() => setHideTextTwo(!hideTextTwo)}></img>
                        </div>
                        <div id={hideTextTwo ? "hide-text" : ""} className="hiw-text">
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                        </div>
                    </div> */}

                    {/* <div className="single-hiw-element">
                        <div>
                            <div>Email notifications</div>
                            <img src="download.png" onClick={() => setHideTextThree(!hideTextThree)}></img>
                        </div>
                        <div id={hideTextThree ? "hide-text" : ""} className="hiw-text">
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default HowItWorkspage;