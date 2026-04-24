import { useState, useEffect, useRef } from 'react'

const SPINNER_VERBS = [
  'Provisioning', 'Deploying', 'Compiling', 'Optimizing', 'Encrypting', 
  'Scaling', 'Synchronizing', 'Authenticating', 'Bootstrapping', 'Fetching', 
  'Patching', 'Scanning', 'Resolving', 'Validating', 'Orchestrating', 
  'Propagating', 'Migrating', 'Initializing', 'Reconciling', 'Indexing'
]

const SPINNER_CHARS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default function Terminal() {
  const [input, setInput] = useState('')
  const [history, setStateHistory] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentVerb, setCurrentVerb] = useState('')
  const [spinnerIdx, setSpinnerIdx] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const terminalRef = useRef(null)

  useEffect(() => {
    // Only enable interactive terminal for desktop/mouse users
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    let interval
    if (isProcessing) {
      interval = setInterval(() => {
        setSpinnerIdx((prev) => (prev + 1) % SPINNER_CHARS.length)
      }, 80)
    }
    return () => clearInterval(interval)
  }, [isProcessing])

  const handleKeyDown = (e) => {
    if (!isDesktop || isProcessing) return

    if (e.key === 'Enter') {
      if (input.trim()) {
        processCommand(input)
      }
      setInput('')
    } else if (e.key === ' ') {
      e.preventDefault() // Stop page scroll and don't add to input
    } else if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1))
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key)
    }
  }

  const processCommand = (cmd) => {
    setIsProcessing(true)
    const verb = SPINNER_VERBS[Math.floor(Math.random() * SPINNER_VERBS.length)]
    setCurrentVerb(verb)

    // Add command to history immediately
    setStateHistory((prev) => [...prev, { type: 'cmd', text: cmd }])

    // Simulate work
    setTimeout(() => {
      setIsProcessing(false)
      setStateHistory((prev) => [
        ...prev, 
        { type: 'result', text: `✔ ${verb} complete` }
      ])
    }, 1500 + Math.random() * 1000)
  }

  // Auto-focus logic or global listener
  useEffect(() => {
    if (!isDesktop) return
    const handleGlobalKeyDown = (e) => {
      // Ignore if user is typing in another input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      handleKeyDown(e)
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isDesktop, input, isProcessing])

  return (
    <div className="p-terminal" ref={terminalRef}>
      <div className="p-term-bar">
        <span className="p-term-dot dot-red"></span>
        <span className="p-term-dot dot-yellow"></span>
        <span className="p-term-dot dot-green"></span>
        <span className="p-term-title">madhosh ~ whoami</span>
      </div>
      <div className="p-term-body">
        {/* Static Profile Data */}
        <div className="p-term-line tl-1"><span className="t-prompt">$</span><span className="t-cmd"> cat profile.json</span></div>
        <div className="p-term-line t-out tl-2"><span className="t-key">cloud</span><span className="t-val">AWS · Azure · GCP</span></div>
        <div className="p-term-line t-out tl-3"><span className="t-key">iac</span><span className="t-val">Terraform . Terraform Cloud . Ansible</span></div>
        <div className="p-term-line t-out tl-4"><span className="t-key">containers</span><span className="t-val">Docker · Podman · Docker Compose</span></div>
        <div className="p-term-line t-out tl-5"><span className="t-key">cicd</span><span className="t-val">GitLab CI · Azure DevOps · GH Actions</span></div>
        <div className="p-term-line t-out tl-6"><span className="t-key">scripting</span><span className="t-val">Bash · Python</span></div>
        <div className="p-term-line t-out tl-7"><span className="t-key">systems</span><span className="t-val">Linux · NGINX · systemd</span></div>
        <div className="p-term-line t-out tl-8"><span className="t-key">self-hosted</span><span className="t-val">GitLab on personal hardware</span></div>
        <div className="p-term-line t-out tl-9"><span className="t-key">status</span><span className="t-green">open to new work ✓</span></div>

        {/* Interactive History */}
        {history.map((item, i) => (
          <div key={i} className={`p-term-line ${item.type === 'result' ? 't-out' : ''}`}>
            <span className="t-prompt">{item.type === 'cmd' ? '$' : ''}</span>
            <span className={item.type === 'cmd' ? 't-cmd' : 't-green'}> {item.text}</span>
          </div>
        ))}

        {/* Current Spinner */}
        {isProcessing && (
          <div className="p-term-line t-out">
            <span className="t-accent">{SPINNER_CHARS[spinnerIdx]}</span>
            <span className="t-val"> {currentVerb}...</span>
          </div>
        )}

        {/* Prompt */}
        {!isProcessing && isDesktop && (
          <div className="p-term-line">
            <span className="t-prompt">$</span>
            <span className="t-cmd"> {input}</span>
            <span className="t-cursor"> ▌</span>
          </div>
        )}

        {/* Placeholder for non-desktop */}
        {!isDesktop && (
          <div className="p-term-line tl-10">
            <span className="t-prompt">$</span>
            <span className="t-cursor"> ▌</span>
          </div>
        )}
      </div>
    </div>
  )
}
