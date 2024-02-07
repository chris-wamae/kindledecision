import DynamicList from "../components/DynamicList";
function CreateChoice(){

  //const choiceInput = useRef(null)
  // const [choiceName, setChoiceName] = useState("")
  //const [electionChoices, setElectionChoices] = useState([])
    const dummyTitle = "What should we do about the state of the project"
    const dummyOptions = ["We should go with it", "We should pause and re-strategize", "We should start afresh"]
    return(
        <>
        <DynamicList listTitle={dummyTitle} itemsArray={dummyOptions}/>
        </>
    )
}

export default CreateChoice;