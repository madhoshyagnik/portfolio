import { useState, useEffect, useRef } from 'react'

const SPINNER_VERBS = [
  'Accomplishing', 'Actioning', 'Actualizing', 'Architecting', 'Baking', 'Beaming', "Beboppin'",
  'Befuddling', 'Billowing', 'Blanching', 'Bloviating', 'Boogieing', 'Boondoggling', 'Booping',
  'Bootstrapping', 'Brewing', 'Bunning', 'Burrowing', 'Calculating', 'Canoodling', 'Caramelizing',
  'Cascading', 'Catapulting', 'Cerebrating', 'Channeling', 'Channelling', 'Choreographing',
  'Churning', 'Clauding', 'Coalescing', 'Cogitating', 'Combobulating', 'Composing', 'Computing',
  'Concocting', 'Considering', 'Contemplating', 'Cooking', 'Crafting', 'Creating', 'Crunching',
  'Crystallizing', 'Cultivating', 'Deciphering', 'Deliberating', 'Determining', 'Dilly-dallying',
  'Discombobulating', 'Doing', 'Doodling', 'Drizzling', 'Ebbing', 'Effecting', 'Elucidating',
  'Embellishing', 'Enchanting', 'Envisioning', 'Evaporating', 'Fermenting', 'Fiddle-faddling',
  'Finagling', 'Flambéing', 'Flibbertigibbeting', 'Flowing', 'Flummoxing', 'Fluttering', 'Forging',
  'Forming', 'Frolicking', 'Frosting', 'Gallivanting', 'Galloping', 'Garnishing', 'Generating',
  'Gesticulating', 'Germinating', 'Gitifying', 'Grooving', 'Gusting', 'Harmonizing', 'Hashing',
  'Hatching', 'Herding', 'Honking', 'Hullaballooing', 'Hyperspacing', 'Ideating', 'Imagining',
  'Improvising', 'Incubating', 'Inferring', 'Infusing', 'Ionizing', 'Jitterbugging', 'Julienning',
  'Kneading', 'Leavening', 'Levitating', 'Lollygagging', 'Manifesting', 'Marinating', 'Meandering',
  'Metamorphosing', 'Misting', 'Moonwalking', 'Moseying', 'Mulling', 'Mustering', 'Musing',
  'Nebulizing', 'Nesting', 'Newspapering', 'Noodling', 'Nucleating', 'Orbiting', 'Orchestrating',
  'Osmosing', 'Perambulating', 'Percolating', 'Perusing', 'Philosophising', 'Photosynthesizing',
  'Pollinating', 'Pondering', 'Pontificating', 'Pouncing', 'Precipitating', 'Prestidigitating',
  'Processing', 'Proofing', 'Propagating', 'Puttering', 'Puzzling', 'Quantumizing', 'Razzle-dazzling',
  'Razzmatazzing', 'Recombobulating', 'Reticulating', 'Roosting', 'Ruminating', 'Sautéing',
  'Scampering', 'Schlepping', 'Scurrying', 'Seasoning', 'Shenaniganing', 'Shimmying', 'Simmering',
  'Skedaddling', 'Sketching', 'Slithering', 'Smooshing', 'Sock-hopping', 'Spelunking', 'Spinning',
  'Sprouting', 'Stewing', 'Sublimating', 'Swirling', 'Swooping', 'Symbioting', 'Synthesizing',
  'Tempering', 'Thinking', 'Thundering', 'Tinkering', 'Tomfoolering', 'Topsy-turvying',
  'Transfiguring', 'Transmuting', 'Twisting', 'Undulating', 'Unfurling', 'Unravelling', 'Vibing',
  'Waddling', 'Wandering', 'Warping', 'Whatchamacalliting', 'Whirlpooling', 'Whirring', 'Whisking',
  'Wibbling', 'Working', 'Wrangling', 'Zesting', 'Zigzagging'
]

const LINUX_RESPONSES = [
  'Applied configuration to /etc/network/interfaces',
  'Kernel panic avoided. Carrying on.',
  'PID 4102 terminated successfully.',
  'Artifacts deployed to /usr/local/bin',
  'Segmentation fault? Just kidding. Done.',
  'Permission granted. Root access simulated.',
  'Garbage collection complete. 402MB freed.',
  'Buffer overflow suppressed.',
  'Entry added to /var/log/syslog',
  'Daemon restarted in background mode.',
  'Container ID 7f3a9e2d synchronized.',
  'Volume mounted at /mnt/data',
  'Synchronized with upstream origin/main',
  'Successfully rebased onto experimental-v5',
  'Warning: System heat stable. Logic continuing.',
  'Memory leak plugged. Resources optimized.'
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
      e.preventDefault()
      setInput((prev) => prev + ' ')
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

    setStateHistory((prev) => [...prev, { type: 'cmd', text: cmd }])

    setTimeout(() => {
      setIsProcessing(false)
      const linuxMsg = LINUX_RESPONSES[Math.floor(Math.random() * LINUX_RESPONSES.length)]
      setStateHistory((prev) => [
        ...prev, 
        { type: 'result', text: `✔ ${verb} complete: ${linuxMsg}` }
      ])
    }, 1200 + Math.random() * 800)
  }

  useEffect(() => {
    if (!isDesktop) return
    const handleGlobalKeyDown = (e) => {
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
        <div className="p-term-line tl-1"><span className="t-prompt">$</span><span className="t-cmd"> cat profile.json</span></div>
        <div className="p-term-line t-out tl-2"><span className="t-key">cloud</span><span className="t-val">AWS · Azure · GCP</span></div>
        <div className="p-term-line t-out tl-3"><span className="t-key">iac</span><span className="t-val">Terraform . Terraform Cloud . Ansible</span></div>
        <div className="p-term-line t-out tl-4"><span className="t-key">containers</span><span className="t-val">Docker · Podman · Docker Compose</span></div>
        <div className="p-term-line t-out tl-5"><span className="t-key">cicd</span><span className="t-val">GitLab CI · Azure DevOps · GH Actions</span></div>
        <div className="p-term-line t-out tl-6"><span className="t-key">scripting</span><span className="t-val">Bash · Python</span></div>
        <div className="p-term-line t-out tl-7"><span className="t-key">systems</span><span className="t-val">Linux · NGINX · systemd</span></div>
        <div className="p-term-line t-out tl-8"><span className="t-key">self-hosted</span><span className="t-val">GitLab on personal hardware</span></div>
        <div className="p-term-line t-out tl-9"><span className="t-key">status</span><span className="t-green">open to new work ✓</span></div>

        {history.map((item, i) => (
          <div key={i} className={`p-term-line ${item.type === 'result' ? 't-out' : ''}`}>
            <span className="t-prompt">{item.type === 'cmd' ? '$' : ''}</span>
            <span className={item.type === 'cmd' ? 't-cmd' : 't-green'}> {item.text}</span>
          </div>
        ))}

        {isProcessing && (
          <div className="p-term-line t-out">
            <span className="t-accent">{SPINNER_CHARS[spinnerIdx]}</span>
            <span className="t-val"> {currentVerb}...</span>
          </div>
        )}

        {!isProcessing && isDesktop && (
          <div className="p-term-line">
            <span className="t-prompt">$</span>
            <span className="t-cmd"> {input}</span>
            <span className="t-cursor"> ▌</span>
          </div>
        )}

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
