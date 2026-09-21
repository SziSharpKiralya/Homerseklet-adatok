import './style.css'
import type { Homerseklet } from './Homerseklet';

const PETRIK_URL = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";

let dataList: Homerseklet[] = [];

function AddData(e: SubmitEvent) {
  console.log("Data added 👍");
  e.preventDefault();

  const documentForm = document.getElementById("documentForm") as HTMLFormElement;
  const documentData = document.getElementById("form_temperature") as HTMLInputElement;

  const formData: Homerseklet = {
    day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    temperature: parseInt(documentData.value),
  }

  dataList.push(formData);
  documentForm.reset();
  LoadData();
}

async function LoadData() {
  console.log("Data loaded 👍");
  const tableContent = document.getElementById("tableContent") as HTMLElement;
  tableContent.innerHTML = "";

  for (const temp of dataList) {
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

async function GetData() {
  const response = await fetch(PETRIK_URL)
  if (!response.ok) {
    return ("An error has occurred");
  }

  const data = await response.json() as Homerseklet[];
  for (const temp of data) {
    dataList.push(temp);
  }

  LoadData();
}

function Init() {
  console.log("Document is online 👍")
  GetData();

  const documentForm = document.getElementById("documentForm") as HTMLElement;
  documentForm.addEventListener("submit", AddData);
}

document.addEventListener("DOMContentLoaded", Init);