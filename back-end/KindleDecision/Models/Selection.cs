﻿namespace KindleDecision.Models
{
    public class Selection
    {
     
    public int Id { get; set; }

    public Choice Choice { get; set; }

    public string Reason { get; set; }

    public int SelectorUserId { get; set;}

    public UserSelectedInQuery UserSelectedInQuery { get; set;}

    }
}
