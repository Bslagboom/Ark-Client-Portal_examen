import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getClients, getProjects, addProject } from "../data/mockData.js";


export default function DashboardPM() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const projects = useMemo(() => getProjects(), []);
  const clients = useMemo(() => getClients(), []);

  // modal state
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");

  const onCreate = () => {
    if (!name.trim()) return;
    const id = addProject({ name: name.trim(), clientIds: clientId ? [clientId] : [] });
    setOpen(false);
    setName("");
    navigate(`/projects/${id}`);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="pageH1">Dashboard – Projectmanager</div>
        <Button size="sm" onClick={() => setOpen(true)}>
          Nieuw project
        </Button>
      </div>

      <Card title="Projecten">
        <div className="table">
          <div className="tr th">
            <div>Project</div>
            <div className="muted">Clients</div>
            <div className="right">Acties</div>
          </div>

          {getProjects().map((p) => (
            <div className="tr" key={p.id}>
              <div className="ellipsis">{p.name}</div>
              <div className="muted">{p.clientIds.length}</div>
              <div className="right">
                <Button size="sm" variant="ghost" onClick={() => navigate(`/projects/${p.id}`)}>
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {open && (
        <div className="modalBackdrop" onMouseDown={() => setOpen(false)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div className="modalTitle">Nieuw project</div>
              <button className="iconBtn" onClick={() => setOpen(false)} aria-label="Sluiten">
                ✕
              </button>
            </div>

            <div className="stack">
              <Input label="Projectnaam" value={name} onChange={(e) => setName(e.target.value)} placeholder="Projectnaam 1" />

              <label className="field">
                <div className="fieldLabel">Klant koppelen</div>
                <select className="select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </label>

              <div className="row right">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Annuleren
                </Button>
                <Button onClick={onCreate}>Aanmaken</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
