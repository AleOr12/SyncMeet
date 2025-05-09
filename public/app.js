import { io } from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

const socket = io();

const root = document.getElementById("root");

let name = "";
let selected = new Set();

const slots = ["Mon 12pm", "Tue 2pm", "Wed 1pm", "Thu 12pm", "Fri 11am"];

const render = (results) => {
  root.innerHTML = "";
  if (!name) {
    const input = document.createElement("input");
    input.placeholder = "Your name";
    input.addEventListener("input", (e) => (name = e.target.value));
    root.appendChild(input);

    const list = document.createElement("ul");
    slots.forEach((slot) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", () => {
        if (selected.has(slot)) {
          selected.delete(slot);
        } else {
          selected.add(slot);
        }
      });
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(slot));
      list.appendChild(li);
    });
    root.appendChild(list);

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.onclick = () => {
      socket.emit("new-availability", {
        name,
        slots: Array.from(selected),
      });
    };
    root.appendChild(btn);
  } else {
    const title = document.createElement("h2");
    title.textContent = "Availability Results";
    root.appendChild(title);

    Object.entries(results || {}).forEach(([slot, count]) => {
      const div = document.createElement("div");
      div.textContent = `${slot}: ${count} available`;
      root.appendChild(div);
    });
  }
};

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("availability-updated", (data) => {
  render(data.timeSlots);
});

render();
