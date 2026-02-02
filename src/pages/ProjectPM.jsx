import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import Tabs from "../components/Tabs.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Badge from "../components/Badge.jsx";
import { getUser } from "../auth/authService.js";
import {
  getProjectById,
  getClients,
  addClientToProject,
  removeClientFromProject,
  addFileToProject,
  deleteFile,
  addFeedback,
} from "../data/mockData.js";

export default function ProjectPM() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();

  const project = useMemo(() => getProjectById(id), [id]);
  const clients = useMemo(() => getClients(), []);
  const [tab, setTab] = useState("Bestanden");
  const [clientPick, setClientPick] = useState(clients[0]?.id ?? "");
  const [message, setMessage] = useState("");

  if (!project) {
    return (
      <div className="page">
        <Card title="Project niet gevonden">
          <Button onClick={() => navigate("/pm")}>Terug</Button>
        </Card>
      </div>
    );
  }

  const projectClients = project.clientIds
    .map((cid) => clients.find((c) => c.id === cid))
    .filter(Boolean);

  const onUpload = (fileList) => {
    const files = Array.from(fileList ?? []);
    files.forEach((f) =>
      addFileToProject({
        projectId: project.id,
        fileName: f.name,
        sizeLabel: `${Math.ceil(f.size / 1024)} KB`,
      })
    );
    navigate(0);
  };

  const onAddMember = () => {
    if (!clientPick) return;
    addClientToProject({ projectId: project.id, clientId: clientPick });
    navigate(0);
  };

  const onRemoveMember = (cid) => {
    removeClientFromProject({ projectId: project.id, clientId: cid });
    navigate(0);
  };

  const onDeleteFile = (fid) => {
    deleteFile({ projectId: project.id, fileId: fid });
    navigate(0);
  };

  const onSend = () => {
    if (!message.trim()) return;
    addFeedback({
      projectId: project.id,
      author: user?.name ?? "PM",
      text: message.trim(),
    });
    setMessage("");
    navigate(0);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="pageH1">Dashboard – Projectmanager</div>
      </div>

      <Card
        title={project.name}
        right={
          <Button size="sm" variant="ghost" onClick={() => navigate("/pm")}>
            Terug
          </Button>
        }
      >
        <div className="rowBetween">
          <Tabs tabs={["Bestanden", "Feedback"]} active={tab} onChange={setTab} />

          <div className="members">
            {projectClients.map((c) => (
              <span key={c.id} className="memberPill">
                <Badge>{c.name}</Badge>
                <button className="iconBtn" onClick={() => onRemoveMember(c.id)} title="Verwijderen">
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {tab === "Bestanden" && (
          <>
            <div
              className="dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onUpload(e.dataTransfer.files);
              }}
            >
              <div className="dropzoneInner">
                <div className="muted">Sleep jouw bestanden hierheen of klik om te uploaden</div>
                <input className="fileInput" type="file" multiple onChange={(e) => onUpload(e.target.files)} />
              </div>
            </div>

            <div className="table">
              <div className="tr th">
                <div>Bestandenaam</div>
                <div>Fmas</div>
                <div>Datum</div>
                <div className="right">Acties</div>
              </div>

              {project.files.map((f) => (
                <div className="tr" key={f.id}>
                  <div className="ellipsis">{f.name}</div>
                  <div className="muted">{f.sizeLabel}</div>
                  <div className="muted">{f.date}</div>
                  <div className="right">
                    <button className="iconBtn" onClick={() => onDeleteFile(f.id)} title="Verwijder">
                      🗑
                    </button>
                  </div>
                </div>
              ))}

              {project.files.length === 0 && <div className="empty">Nog geen bestanden.</div>}
            </div>

            <div className="row">
              <div className="grow">
                <div className="fieldLabel">Client selecteren</div>
                <select className="select" value={clientPick} onChange={(e) => setClientPick(e.target.value)}>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={onAddMember}>Toevoegen</Button>
            </div>
          </>
        )}

        {tab === "Feedback" && (
          <>
            <div className="feedbackList">
              {project.feedback.map((fb) => (
                <div key={fb.id} className="feedbackItem">
                  <div className="feedbackMeta">
                    <b>{fb.author}</b> <span className="muted">{fb.date}</span>
                  </div>
                  <div>{fb.text}</div>
                </div>
              ))}
              {project.feedback.length === 0 && <div className="empty">Nog geen feedback.</div>}
            </div>

            <div className="row">
              <div className="grow">
                <Input placeholder="Plaats feedback..." value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button onClick={onSend}>Versturen</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
