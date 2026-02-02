import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { getUser } from "../auth/authService.js";
import { getProjectsForClient, addFileToProject } from "../data/mockData.js";

export default function DashboardClient() {
  const user = getUser();
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const projects = useMemo(() => {
    if (!user?.clientId) return [];
    return getProjectsForClient(user.clientId);
  }, [user?.clientId]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? projects[0] ?? null;

  const onSelect = (e) => setSelectedProjectId(e.target.value);

  const onUpload = (fileList) => {
    if (!selectedProject) return;
    const files = Array.from(fileList ?? []);
    files.forEach((f) => addFileToProject({ projectId: selectedProject.id, fileName: f.name, sizeLabel: `${Math.ceil(f.size / 1024)} KB` }));
    // force rerender: quick trick -> navigate to same route
    navigate(0);
  };

  return (
    <div className="page">
      <div className="pageHeader">
        <div className="pageH1">Dashboard – Klant</div>
      </div>

      <Card
        title={selectedProject ? selectedProject.name : "Projectnaam"}
        right={
          selectedProject ? (
            <Button size="sm" onClick={() => navigate(`/projects/${selectedProject.id}`)}>
              Bekijk project
            </Button>
          ) : null
        }
      >
        <div className="row">
          <div className="grow">
            <div className="fieldLabel">Projectnaam</div>
            <select className="select" value={selectedProject?.id ?? ""} onChange={onSelect}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            <input
              className="fileInput"
              type="file"
              multiple
              onChange={(e) => onUpload(e.target.files)}
              aria-label="Upload bestanden"
            />
          </div>
        </div>

        <div className="table">
          <div className="tr th">
            <div>Bestandenaam</div>
            <div>Fmes</div>
            <div>Datum</div>
            <div className="right">Acties</div>
          </div>

          {(selectedProject?.files ?? []).slice(0, 6).map((f) => (
            <div className="tr" key={f.id}>
              <div className="ellipsis">{f.name}</div>
              <div className="muted">{f.sizeLabel}</div>
              <div className="muted">{f.date}</div>
              <div className="right muted">—</div>
            </div>
          ))}

          {(!selectedProject || (selectedProject.files ?? []).length === 0) && (
            <div className="empty">Nog geen bestanden.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
