import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import Tabs from "../components/Tabs.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { getUser } from "../auth/authService.js";
import { getProjectById, addFileToProject, addFeedback } from "../data/mockData.js";

export default function ProjectClient() {
  const { id } = useParams();
  const user = getUser();
  const navigate = useNavigate();

  const project = useMemo(() => getProjectById(id), [id]);
  const [tab, setTab] = useState("Bestanden");
  const [message, setMessage] = useState("");

  if (!project) {
    return (
      <div className="page">
        <Card title="Project niet gevonden">
          <Button onClick={() => navigate("/client")}>Terug</Button>
        </Card>
      </div>
    );
  }

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

  const onSend = () => {
    if (!message.trim()) return;
    addFeedback({
      projectId: project.id,
      author: user?.name?.split(" ")[0] ?? "Client",
      text: message.trim(),
    });
    setMessage("");
    navigate(0);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="pageH1">Projectdetail – Klant</div>
      </div>

      <Card title={project.name}>
        <Tabs tabs={["Bestanden", "Feedback"]} active={tab} onChange={setTab} />

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
                  <div className="right muted">—</div>
                </div>
              ))}

              {project.files.length === 0 && <div className="empty">Nog geen bestanden.</div>}
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
