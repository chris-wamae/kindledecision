﻿using KindleDecision.Models;

namespace KindleDecision.Dto
{
    public class SelectionDto
    {   
        public int Id { get; set; } 

        public string Reason { get; set; }
        public int SelectorUserId { get; set; }
    }
}
