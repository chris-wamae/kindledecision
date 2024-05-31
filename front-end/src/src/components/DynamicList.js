import { useEffect, useState } from "react"
import "../styles/DynamicList.css"
import { removeOption } from "../Helper/Form";
//provides a list with a button for removing items from the list persitently
function DynamicList({listTitle, itemsArray, removeOption}){


return (
//pv:item-info
 <div className="dynamic-list-container">
          {
            <>
              {
                itemsArray.length == 0 ?
                  <div className="list-column"></div>
                  :
                  <div className="list-column">
                    <div className="list-title">{listTitle}</div>
                    <div className="list-container">
                      {

                        itemsArray.map((item, i) => {
                          if (itemsArray.length - 1 == i) {
                            return <>
                              <div className="option-container">
                                <div>{item}</div>
                                <button className="remove-button" onClick={() => removeOption(i)}>X</button>
                              </div>
                            </>
                          }
                          else {
                            return <>
                              <div className="option-container">
                                <div>{item}</div>
                                <button className="remove-button" onClick={() => removeOption(i)}>X</button>
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