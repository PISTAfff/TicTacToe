var Player_Turn = true;
var Cells = [
  ["e", "e", "e"],
  ["e", "e", "e"],
  ["e", "e", "e"],
];
var waitforclick = false;
var Turn = true;
var Round_Finished = false;
var Ai_Won = false;
var Player_Won = false;
var P_Score_int = 0;
var P_Score = document.getElementById("P_Score");
var AI_Score_int = 0;
var AI_Score = document.getElementById("C_Score");
var Tie_Score_int = 0;
var Tie_Score = document.getElementById("Ties");
function Place(Row, Colum) {
  const id = `R${Row}_C${Colum}`;
  if (Player_Turn) {
    let Cell = document.getElementById(id);
    if (Cells[Row - 1][Colum - 1] == "e") {
      Cells[Row - 1][Colum - 1] = "x";
      let newElement = document.createElement("div");
      newElement.classList.add("Element");
      newElement.textContent = "X";
      Cell.appendChild(newElement);
      let Count;
      Count = 0;
      if (!Player_Won) {
        Cells[Row - 1].forEach((cell) => {
          if (cell == "x") {
            Count++;
          }
        });
        if (Count == 3) {
          Player_Won = true;
        }
      }
      if (!Player_Won) {
        Count = 0;
        for (let j = 0; j < 3; j++) {
          if (Cells[j][Colum - 1] == "x") {
            Count++;
          }
        }
        if (Count == 3) {
          Player_Won = true;
        }
      }
      if (!Player_Won) {
        Count = 0;
        for (let i = 0; i < 3; i++) {
          if (Cells[i][i] == "x") {
            Count++;
          }
        }
        if (Count == 3) {
          Player_Won = true;
        }
      }
      if (!Player_Won) {
        Count = 0;
        for (let i = 0; i < 3; i++) {
          if (Cells[i][-i + 2] == "x") {
            Count++;
          }
        }
        if (Count == 3) {
          Player_Won = true;
        }
      }
      Player_Turn = false;
      if (!Player_Won) {
        Ai();
      } else {
        Round_Finished = true;
        P_Score_int++;
        P_Score.textContent = P_Score_int;
      }
    }
  }
}

function Place_O(id) {
  let Cell = document.getElementById(id);
  let newElement = document.createElement("div");
  newElement.classList.add("Element");
  newElement.textContent = "O";
  Cell.appendChild(newElement);
}
function Clear_Everything() {
  Turn = true;
  Clear_Round(true);
  P_Score_int = 0;
  P_Score.textContent = "0";
  AI_Score_int = 0;
  AI_Score.textContent = "0";
  Tie_Score_int = 0;
  Tie_Score.textContent = "0";
}
function Clear_Round(Reset) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      Cells[i][j] = "e";
      const id = `R${i + 1}_C${j + 1}`;
      let Cell = document.getElementById(id);
      while (Cell.firstChild) {
        Cell.removeChild(Cell.firstChild);
      }
    }
  }
  waitforclick = false;
  Round_Finished = false;
  Turn = !Reset ? !Turn : Turn;
  Player_Won = false;
  Ai_Won = false;
  Player_Turn = Turn;
  if (!Player_Turn) {
    Ai();
  }
}
function Check_Attack() {
  let Count = 0;
  let Empty_Cell = -1;
  if (!Player_Turn) {
    for (let Row_V = 0; Row_V < 3; Row_V++) {
      Count = 0;
      if (Cells[Row_V].includes("o")) {
        Cells[Row_V].forEach((Cell) => {
          if (Cell == "o") {
            Count++;
          }
        });
      }
      if (Count == 2) {
        if (Cells[Row_V].includes("e")) {
          let Last_Cell = Cells[Row_V].indexOf("e");
          const id = `R${Row_V + 1}_C${Last_Cell + 1}`;
          Place_O(id);
          Cells[Row_V][Last_Cell] = "o";
          Ai_Won = true;
          break;
        }
      }
    }
  }
  if (!Player_Turn) {
    Empty_Cell = -1;
    for (let V_Colum = 0; V_Colum < 3; V_Colum++) {
      Count = 0;
      for (let V_Row = 0; V_Row < 3; V_Row++) {
        if (Cells[V_Row][V_Colum] == "o") {
          Count++;
        } else if (Cells[V_Row][V_Colum] == "e") {
          Empty_Cell = V_Row;
        } else if (Cells[V_Row][V_Colum] == "x") {
          Empty_Cell = -1;
        }
      }
      if (Count == 2) {
        if (Empty_Cell != -1) {
          const id = `R${Empty_Cell + 1}_C${V_Colum + 1}`;
          Place_O(id);
          Cells[Empty_Cell][V_Colum] = "o";
          Ai_Won = true;
          break;
        }
      }
    }
  }
  if (!Player_Turn) {
    Count = 0;
    Empty_Cell = -1;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][i] == "o") {
        Count++;
      } else if (Cells[i][i] == "e") {
        Empty_Cell = i;
      } else if (Cells[i][i] == "x") {
        Empty_Cell = -1;
      }
    }
    if (Count == 2) {
      if (Empty_Cell != -1) {
        const id = `R${Empty_Cell + 1}_C${Empty_Cell + 1}`;
        Place_O(id);
        Cells[Empty_Cell][Empty_Cell] = "o";
        Ai_Won = true;
      }
    }
    Count = 0;
    Empty_Cell = -1;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][-i + 2] == "o") {
        Count++;
      } else if (Cells[i][-i + 2] == "e") {
        Empty_Cell = i;
      } else if (Cells[i][-i + 2] == "x") {
        Empty_Cell = -1;
      }
    }
    if (Count == 2) {
      if (Empty_Cell != -1) {
        const id = `R${Empty_Cell + 1}_C${-Empty_Cell + 2 + 1}`;
        Place_O(id);
        Cells[Empty_Cell][-Empty_Cell + 2] = "o";
        Ai_Won = true;
      }
    }
  }
  if (Ai_Won) {
    Round_Finished = true;
    AI_Score_int++;
    AI_Score.textContent = AI_Score_int;
  }
}
function Check_Defense() {
  let Count = 0;
  let Empty_Cell = -1;
  if (!Player_Turn) {
    for (let Row_V = 0; Row_V < 3; Row_V++) {
      Count = 0;
      if (Cells[Row_V].includes("x")) {
        Cells[Row_V].forEach((Cell) => {
          if (Cell == "x") {
            Count++;
          }
        });
      }
      if (Count == 2) {
        if (Cells[Row_V].includes("e")) {
          let Last_Cell = Cells[Row_V].indexOf("e");
          const id = `R${Row_V + 1}_C${Last_Cell + 1}`;
          Place_O(id);
          Cells[Row_V][Last_Cell] = "o";
          Player_Turn = true;
          break;
        }
      }
    }
  }

  if (!Player_Turn) {
    for (let V_Colum = 0; V_Colum < 3; V_Colum++) {
      Count = 0;
      Empty_Cell = -1;
      for (let V_Row = 0; V_Row < 3; V_Row++) {
        if (Cells[V_Row][V_Colum] == "x") {
          Count++;
        } else if (Cells[V_Row][V_Colum] == "e") {
          Empty_Cell = V_Row;
        } else if (Cells[V_Row][V_Colum] == "o") {
          Empty_Cell = -1;
        }
      }
      if (Count == 2) {
        if (Empty_Cell != -1) {
          const id = `R${Empty_Cell + 1}_C${V_Colum + 1}`;
          Place_O(id);
          Cells[Empty_Cell][V_Colum] = "o";
          Player_Turn = true;
          break;
        }
      }
    }
  }

  if (!Player_Turn) {
    Count = 0;
    Empty_Cell = -1;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][i] == "x") {
        Count++;
      } else if (Cells[i][i] == "e") {
        Empty_Cell = i;
      } else if (Cells[i][i] == "o") {
        Empty_Cell = -1;
      }
    }
    if (Count == 2) {
      if (Empty_Cell != -1) {
        const id = `R${Empty_Cell + 1}_C${Empty_Cell + 1}`;
        Place_O(id);
        Cells[Empty_Cell][Empty_Cell] = "o";
        Player_Turn = true;
      }
    }
  }
  if (!Player_Turn) {
    Count = 0;
    Empty_Cell = -1;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][-i + 2] == "x") {
        Count++;
      } else if (Cells[i][-i + 2] == "e") {
        Empty_Cell = i;
      } else if (Cells[i][-i + 2] == "o") {
        Empty_Cell = -1;
      }
    }
    if (Count == 2) {
      if (Empty_Cell != -1) {
        const id = `R${Empty_Cell + 1}_C${-Empty_Cell + 2 + 1}`;
        Place_O(id);
        Cells[Empty_Cell][-Empty_Cell + 2] = "o";
        Player_Turn = true;
      }
    }
  }
}
function Check_Cell() {
  let Count = 0;
  let Empty_Cell = -1;
  if (!Player_Turn) {
    for (let Row_V = 0; Row_V < 3; Row_V++) {
      Count = 0;
      if (Cells[Row_V].includes("o")) {
        Cells[Row_V].forEach((Cell) => {
          if (Cell == "e") {
            Count++;
          }
        });
      }
      if (Count == 2) {
        let Last_Cell = Cells[Row_V].lastIndexOf("e");
        const id = `R${Row_V + 1}_C${Last_Cell + 1}`;
        Place_O(id);
        Cells[Row_V][Last_Cell] = "o";
        Player_Turn = true;
        break;
      }
    }
  }

  if (!Player_Turn) {
    for (let V_Colum = 0; V_Colum < 3; V_Colum++) {
      Count = 0;
      let Found_x = false;
      let Found_o = false;
      for (let V_Row = 0; V_Row < 3; V_Row++) {
        if (Cells[V_Row][V_Colum] == "e") {
          Count++;
          Empty_Cell = V_Row;
        } else if (Cells[V_Row][V_Colum] == "o") {
          Found_o = true;
        } else if (Cells[V_Row][V_Colum] == "x") {
          Found_x = true;
        }
      }
      if (Count == 2) {
        if (!Found_x && Found_o) {
          const id = `R${Empty_Cell + 1}_C${V_Colum + 1}`;
          Place_O(id);
          Cells[Empty_Cell][V_Colum] = "o";
          Player_Turn = true;
          break;
        }
      }
    }
  }

  let Found_x = false;
  let Found_o = false;
  if (!Player_Turn) {
    Count = 0;
    Empty_Cell = -1;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][i] == "e") {
        Count++;
        Empty_Cell = i;
      } else if (Cells[i][i] == "x") {
        Found_x = true;
      } else if (Cells[i][i] == "o") {
        Found_o = true;
      }
    }
    if (Count == 2) {
      if (!Found_x && Found_o) {
        const id = `R${Empty_Cell + 1}_C${Empty_Cell + 1}`;
        Place_O(id);
        Cells[Empty_Cell][Empty_Cell] = "o";
        Player_Turn = true;
      }
    }
  }
  if (!Player_Turn) {
    Count = 0;
    Empty_Cell = -1;
    Found_x = false;
    Found_o = false;
    for (let i = 0; i < 3; i++) {
      if (Cells[i][-i + 2] == "e") {
        Count++;
        Empty_Cell = i;
      } else if (Cells[i][-i + 2] == "x") {
        Found_x = true;
      } else if (Cells[i][-i + 2] == "o") {
        Found_o = true;
      }
    }
    if (Count == 2) {
      if (!Found_x && Found_o) {
        const id = `R${Empty_Cell + 1}_C${-Empty_Cell + 2 + 1}`;
        Place_O(id);
        Cells[Empty_Cell][-Empty_Cell + 2] = "o";
        Player_Turn = true;
      }
    }
  }
}
function Play_Random() {
  let Empty_Cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (Cells[i][j] == "e") {
        Empty_Cells.push([i, j]);
      }
    }
  }
  if (Empty_Cells.length > 0) {
    let R, C;
    let Rnum = getRandomNumber(0, Empty_Cells.length - 1);
    R = Empty_Cells[Rnum][0];
    C = Empty_Cells[Rnum][1];
    const id = `R${R + 1}_C${C + 1}`;
    Place_O(id);
    Cells[R][C] = "o";
    Player_Turn = true;
  }
}
function Ai() {
  if (!Player_Turn && !Ai_Won) Check_Attack();

  if (!Player_Turn && !Ai_Won) Check_Defense();

  if (!Player_Turn && !Ai_Won) Check_Cell();

  if (!Player_Turn && !Ai_Won) Play_Random();
  let Count = 0;
  for (let i = 0; i < 3; i++) {
    if (!Cells[i].includes("e")) {
      Count++;
    }
  }
  if (Count == 3) {
    Round_Finished = true;
    Tie_Score_int++;
    Tie_Score.textContent = Tie_Score_int;
  }
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
document.addEventListener("click", handleClick);
function handleClick(event) {
  if (Round_Finished) {
    if (waitforclick) {
      Clear_Round();
    } else {
      waitforclick = true;
    }
  }
}
