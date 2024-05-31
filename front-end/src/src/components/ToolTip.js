import "../styles/Tooltip.css"

function ToolTip({message,type,color}){ 
if(!color)
{
 if(type == "error")
  {
    color = "red"
  }

  else if(type == "tip")
  {
    color = "grey"
  }

  else if(type == "warning")
  {
   color = "yellow"
  }
  else if(type == "success")
  {
    color = "green"
  }

}

const iconGenerator = (type) => {
if(type == "error")
{
return <span className="error-icon">!</span>
}
else if(type == "tip")
{
return <span className="tip-icon">i</span>
}
else if(type == "success")
{
return <span className="success-icon">i</span>
}
else if(type == "warning")
{
return <span className="warning-icon">!</span>
}
else{
return <span></span>
}
}

return(
<div className="tooltip" >
{iconGenerator(type)}
<span className={color}>{message}</span>
</div>
)
}

export default ToolTip;