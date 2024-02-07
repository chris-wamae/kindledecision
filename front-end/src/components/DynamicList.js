import { useState } from "react"
import "../styles/DynamicList.css"
import { removeOption } from "../Helper/Form";
//provides a list with a button for removing items from the list persitently
function DynamicList({listTitle, itemsArray}){

const [listItems, setListItems] = useState(itemsArray);

return (
//pv:item-info
 <div className="page-container">
          {
            <>
              {
                listItems.length == 0 ?
                  <div className="list-column"></div>
                  :
                  <div className="list-column">
                    <div className="list-title">{listTitle}</div>
                    <div className="list-container">
                      {

                        listItems.map((item, i) => {
                          if (listItems.length - 1 == i) {
                            return <>
                              <div className="option-container">
                                <div>{item}</div>
                                <button className="remove-button" onClick={() => removeOption(listItems, setListItems, i)}>X</button>
                              </div>
                            </>
                          }
                          else {
                            return <>
                              <div className="option-container">
                                <div>{item}</div>
                                <button className="remove-button" onClick={() => removeOption(listItems, setListItems, i)}>X</button>
                              </div>
                              <hr />
                            </>
                          }

                        })


                      }
                    </div>
                  </div>
              }

            </>

          }
        </div>
)
}

export default DynamicList;