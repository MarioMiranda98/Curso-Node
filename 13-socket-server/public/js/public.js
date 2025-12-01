function renderTickets(tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) {
      break;
    }

    const ticket = tickets[i];

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

    if (ticket) {
      lblDesk.innerText = ticket.handleAtDesk;
      lblTicket.innerText = `Ticket ${ticket.ticket}`;
    }
  }
}

async function fetchTicketsWorkingOn() {
  const payload = await fetch("/api/ticket/working-on").then((res) =>
    res.json()
  );

  renderTickets(payload);
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    console.log(event.data);
    const { payload } = JSON.parse(event.data);

    if (type != "on-working-changed") {
      return;
    }

    renderTickets(payload);

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

connectToWebSockets();
fetchTicketsWorkingOn();
