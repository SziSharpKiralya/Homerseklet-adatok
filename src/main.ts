import './style.css'
import type { Homerseklet } from './Homerseklet';

const PETRIK_URL = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";

function AddData() {
  console.log("Not ready yet ❌")
}

async function LoadData() {
  console.log("Not ready yet ❌")
  const response = await fetch(PETRIK_URL)
  if (!response.ok) {
    return ("An error has occurred");
  }

  const data = await response.json() as Homerseklet[];
  const tableContent = document.getElementById("tableContent") as HTMLElement;
  tableContent!.innerHTML = "";


  for (const temp of data) {
    const tableRow = document.createElement("tr");
    tableContent.appendChild(tableRow);

    const cellDay = document.createElement("td");
    cellDay.innerText = temp.day;
    tableRow.appendChild(cellDay);

    const cellTemp = document.createElement("td");
    cellTemp.innerText = `${temp.temperature.toString()}°C`;

    if (temp.temperature >= 30) {
      tableRow.classList.add("heat");
    }
    else if (temp.temperature < 10) {
      tableRow.classList.add("cool");
    }

    tableRow.appendChild(cellTemp);
  }
}

function Init() {
  console.log("Document is online 👍")
  LoadData();
}

document.addEventListener("DOMContentLoaded", Init);