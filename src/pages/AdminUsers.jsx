import React, { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getClients, addClient, deleteClient } from "../data/mockData.js";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const navigate = useNavigate();
  const clients = useMemo(() => getClients(), []);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onCreate = () => {
    if (!name.trim() || !email.trim()) return;
    addClient({ name: name.trim(), email: email.trim() });
    setOpen(false);
    setName("");
    setEmail("");
    navigate(0);
  };

  const onDelete = (id) => {
    deleteClient(id);
    navigate(0);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="pageH1">Admin – Klanten beheren</div>
      </div>

      <Card
        title="Klanten beheren"
        right={
          <Button size="sm" onClick={() => setOpen(true)}>
            Nieuwe klant toevoegen
          </Button>
        }
      >
        <div className="table">
          <div className="tr th">
            <div>Naam</div>
            <div>E-mailadres</div>
            <div className="right">Acties</div>
          </div>

          {getClients().map((c) => (
            <div className="tr" key={c.id}>
              <div className="ellipsis">{c.name}</div>
              <div className="muted ellipsis">{c.email}</div>
              <div className="right">
                <button className="iconBtn" onClick={() => onDelete(c.id)} title="Verwijder klant">
                  🗑
                </button>
              </div>
            </div>
          ))}

          {getClients().length === 0 && <div className="empty">Nog geen klanten.</div>}
        </div>
      </Card>

      {open && (
        <div className="modalBackdrop" onMouseDown={() => setOpen(false)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div className="modalTitle">Nieuwe klant toevoegen</div>
              <button className="iconBtn" onClick={() => setOpen(false)} aria-label="Sluiten">
                ✕
              </button>
            </div>

            <div className="stack">
              <Input label="Naam" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jan Jansen" />
              <Input label="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jan@klant.nl" />

              <div className="row right">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Annuleren
                </Button>
                <Button onClick={onCreate}>Toevoegen</Button>
              </div>

              <div className="muted">
                (Tip: dit maakt alleen een klant-record. Als je ook een login-account wilt genereren, zeggen je het — dan voeg ik dat toe.)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
