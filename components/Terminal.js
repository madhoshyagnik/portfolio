export default function Terminal() {
  return (
    <div className="p-terminal">
      <div className="p-term-bar">
        <span className="p-term-dot dot-red"></span>
        <span className="p-term-dot dot-yellow"></span>
        <span className="p-term-dot dot-green"></span>
        <span className="p-term-title">madhosh ~ whoami</span>
      </div>
      <div className="p-term-body">
        <div className="p-term-line tl-1"><span className="t-prompt">$</span><span className="t-cmd"> cat profile.json</span></div>
        <div className="p-term-line t-out tl-2"><span className="t-key">cloud</span><span className="t-val">AWS · Azure · GCP</span></div>
        <div className="p-term-line t-out tl-3"><span className="t-key">iac</span><span className="t-val">Terraform . Terraform Cloud . Ansible</span></div>
        <div className="p-term-line t-out tl-4"><span className="t-key">containers</span><span className="t-val">Docker · Podman · Docker Compose</span></div>
        <div className="p-term-line t-out tl-5"><span className="t-key">cicd</span><span className="t-val">GitLab CI · Azure DevOps · GH Actions</span></div>
        <div className="p-term-line t-out tl-6"><span className="t-key">scripting</span><span className="t-val">Bash · Python</span></div>
        <div className="p-term-line t-out tl-7"><span className="t-key">systems</span><span className="t-val">Linux · NGINX · systemd</span></div>
        <div className="p-term-line t-out tl-8"><span className="t-key">self-hosted</span><span className="t-val">GitLab on personal hardware</span></div>
        <div className="p-term-line t-out tl-9"><span className="t-key">status</span><span className="t-green">open to new work ✓</span></div>
        <div className="p-term-line tl-10"><span className="t-prompt">$</span><span className="t-cursor"> ▌</span></div>
      </div>
    </div>
  )
}
