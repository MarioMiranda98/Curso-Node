const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");
const currentTicketLbl = document.querySelector("small");

const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Escritorio es requerido");
}

const deskNumber = searchParams.get("escritorio");
let workingTicket = null;
deskHeader.innerText = deskNumber;

function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    1;
    noMoreAlert.classList.remove("d-none");
  } else {
    noMoreAlert.classList.add("d-none");
  }

  lblPending.innerHTML = currentCount;
}

async function getTicket() {
  const { status, ticket, message } = await fetch(
    `/api/ticket/draw/${deskNumber}`
  ).then((res) => res.json());

  if (status === "error") {
    currentTicketLbl.innerText = message;
    return;
  }

  workingTicket = ticket;
  currentTicketLbl.innerText = ticket.number;
}

async function finishTicket() {
  if (!workingTicket) return;

  const { id: ticketId } = workingTicket;

  const { status, message } = await fetch(`/api/done/${ticketId}`, {
    method: "PUT",
  }).then((res) => res.json());

  if (status === "error") {
    currentTicketLbl.innerText = message;
    return;
  }

  workingTicket = null;
  currentTicketLbl.innerText = "Nadie...";
}

async function loadInitialCount() {
  const pending = await fetch("/api/ticket/pending").then((res) => res.json());

  lblPending.innerHTML = pending.length || 0;
  checkTicketCount(pending.length);
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    console.log(event.data);
    const { payload } = JSON.parse(event.data);

    lblPending.innerHTML = payload;
    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

btnDraw.addEventListener("click", getTicket);
btnDone.addEventListener("click", finishTicket);

connectToWebSockets();
loadInitialCount();
