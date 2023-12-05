import { useState } from "react";
import "../styles/HowItWorkspage.css"
function HowItWorkspage() {
    
    const [hideText,setHideText] = useState(true);
    
    return (
        <>
            <section>
                <div>How it works</div>
                <div>
                    <div>
                        <div>
                            <div>Creating an account/login</div>

                            <button onClick={() => setHideText(!hideText)}>V</button>
                        </div>
                        <div class={hideText ? "hide-text" : ""}>
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                            The quick brown fox jumped over the lazy dog.
                        </div>
                    </div>

                    <div>
                        <div>Participating in voting</div>
                        <button>V</button>
                    </div>
                    <div>
                        <div>Holding an election</div>
                        <button>V</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HowItWorkspage;