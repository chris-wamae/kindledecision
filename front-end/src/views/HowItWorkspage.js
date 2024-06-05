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
                        <div>FAQ</div>

                        <img src="download.png" onClick={() => setHideTextThree(!hideTextThree)}></img>
                    </div>
                    <div id={hideTextThree ? "hide-text" : ""} className="hiw-text">
                    </div>

                    <div className="single-hiw-element">
                        <div>Creating an account/login</div>

                        <img src="download.png" onClick={() => setHideText(!hideText)}></img>
                    </div>
                    <div id={hideText ? "hide-text" : ""} className="hiw-text">
                      To create your account, click on the sign-up button on the home page. This will take you to the sign-up page. Enter the required details in the form and select your visibility in queries. <br/>If everything is okay, the button will turn black. Click on it to create your account. If the account creation is successful you will be  redirected to login with your new account.
                    </div>

                    <div className="single-hiw-element" id="middle-hiw-element">
                        <div>Using the application</div>

                        <img src="download.png" onClick={() => setHideTextTwo(!hideTextTwo)}></img>
                    </div>
                    <div id={hideTextTwo ? "hide-text" : ""} className="hiw-text">
                   After login, you will be redirected to your user dashboard. Here, your can view all queries you have been invited to or that you have created.
                   <br/>You can also create your own queries from here by clicking the plus button and following the steps to add all the required details.<br/>Please note that you have to add yourself as a participant in the query you are creating if your wish to participate in it, this is not done automatically.<br/>
                   You can also manage your account from here: you can view your account information, change your email or delete your account. Deleting your account permanently  deletes all the queries your created as well.
                    </div>


                    <div className="single-hiw-element">
                        <div>Queries information and participation</div>

                        <img src="download.png" onClick={() => setHideTextThree(!hideTextThree)}></img>
                    </div>
                    <div id={hideTextThree ? "hide-text" : ""} className="hiw-text">
                     To view the participation progress or information on a query, click on it from any of the lists shown on the dashboard. If none of the lists show anything, it means you have not created any queries and don't have any invitations either.<br/> When you click on a query, you can view information on it like its choices, participants, creation date and more. If you have not participated in it yet, an orange participate button will also be visible which will allow you to make a choice in the query.<br/>If you are currently viewing a query that you created, a delete query button will also be visible at the bottom of the page.
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