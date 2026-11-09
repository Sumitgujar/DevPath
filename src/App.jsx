import React, { useEffect, useMemo, useRef, useState } from 'react';
import { tools, roadmap } from './data';

const initialProgress = () => {
  try { return JSON.parse(localStorage.getItem('devpath-progress') || '{}'); }
  catch { return {}; }
};
function App() {
  const [active, setActive] = useState('overview');
  const [selectedTool, setSelectedTool] = useState('linux');
  const [completed, setCompleted] = useState(initialProgress);
  const [query, setQuery] = useState('');
  const [terminalLines, setTerminalLines] = useState([{type:'system',text:'DevPath interactive lab · simulated environment'}, {type:'system',text:'Type help to see available commands. This terminal does not execute commands on your computer.'}]);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [expanded, setExpanded] = useState('01');
  const terminalRef = useRef(null);
  const tool = tools.find(t => t.id === selectedTool) || tools[0];
  const total = tools.reduce((n,t)=>n+t.topics.length,0);
  const done = Object.values(completed).filter(Boolean).length;
  const pct = Math.round(done/total*100);
  useEffect(()=>{localStorage.setItem('devpath-progress',JSON.stringify(completed));},[completed]);
  useEffect(()=>{terminalRef.current?.scrollTo({top:terminalRef.current.scrollHeight,behavior:'smooth'});},[terminalLines]);
  const filteredTools = useMemo(()=>tools.filter(t=>`${t.name} ${t.category}`.toLowerCase().includes(query.toLowerCase())),[query]);
  function toggleTopic(key){setCompleted(p=>({...p,[key]:!p[key]}));}
  function runCommand(raw){
    const value=raw.trim(); if(!value)return;
    const cmd=value.toLowerCase();
    const base=[...terminalLines,{type:'input',text:value}];
    let output='', type='output';
    const catalog=tools.flatMap(t=>t.commands.map(c=>({...c,tool:t})));
    const toolNames=tools.map(t=>t.id);
    const printHelp=(target)=>{
      const selected=tools.find(t=>t.id===target || t.name.toLowerCase().startsWith(target));
      if(!selected)return `Unknown tool: ${target}. Run tools to list available modules.`;
      return `${selected.name} · ${selected.level}\n${selected.why}\n\nCOMMANDS (${selected.commands.length})\n${selected.commands.map(c=>`  ${c.cmd}\n      ${c.desc}`).join('\n')}`;
    };
    if(cmd==='clear' || cmd==='cls'){setTerminalLines([]);setCommand('');setCommandHistory(h=>[...h,value]);setHistoryIndex(-1);return;}
    if(cmd==='help' || cmd==='--help') output='DEVPATH SHELL · COMMAND GUIDE\n\nGeneral\n  help                    Show this help\n  tools                   List available tool modules\n  <tool> --help           Show commands for a tool (linux, git, docker, kubernetes, cicd, terraform, cloud, monitoring)\n  man <tool>              Open a tool command reference\n  explain <command>       Explain a command from the catalogue\n  history                 Show commands from this session\n  clear                   Clear the terminal\n\nShell basics\n  pwd | ls -la | whoami | uname -a | date\n  cat README.md | echo <text> | cd <folder>\n\nDevOps CLIs\n  git, docker, kubectl, gh, terraform, aws, prometheus, promtool\n\nTip: use ↑ / ↓ to browse command history. Commands are simulated; no real infrastructure is changed.';
    else if(cmd==='tools') output=tools.map(t=>`${t.id.padEnd(14)} ${t.name} · ${t.commands.length} commands`).join('\n');
    else if(cmd==='history') output=commandHistory.length?commandHistory.map((c,i)=>`${String(i+1).padStart(3)}  ${c}`).join('\n'):'No commands in this session yet.';
    else if(cmd==='pwd') output='/home/learner/devpath-lab';
    else if(cmd==='whoami') output='learner';
    else if(cmd==='hostname') output='devpath-lab';
    else if(cmd==='uname -a') output='Linux devpath-lab 6.8.0-devpath #1 SMP x86_64 GNU/Linux';
    else if(cmd==='date') output='Sun Nov 08 18:00:00 IST 2026';
    else if(cmd==='ls' || cmd==='ls -la' || cmd==='ls -lah') output=cmd==='ls'?'README.md  app/  Dockerfile  docker-compose.yml  deployment.yaml  .github/  terraform/':'drwxr-xr-x  8 learner learner 4096 Nov 08 12:00 .\ndrwxr-xr-x  4 root    root    4096 Nov 07 18:10 ..\n-rw-r--r--  1 learner learner  820 README.md\ndrwxr-xr-x  2 learner learner 4096 app\n-rw-r--r--  1 learner learner  640 Dockerfile\n-rw-r--r--  1 learner learner  512 docker-compose.yml\ndrwxr-xr-x  3 learner learner 4096 .github';
    else if(cmd==='cat readme.md') output='# DevPath sample project\nA sample web application used for DevOps practice.\n\nServices: api, database, prometheus, grafana.\nDeployment: Docker Compose and Kubernetes.';
    else if(cmd.startsWith('echo ')) output=value.slice(5);
    else if(cmd.startsWith('cd ')){const target=value.slice(3).trim();output=['..','/home/learner','/home/learner/devpath-lab','app','terraform','.github'].includes(target)?`Directory changed (simulated): ${target}`:`bash: cd: ${target}: No such directory in the sample lab`;if(output.startsWith('bash:'))type='error';}
    else if(cmd.startsWith('tools ')) output=printHelp(cmd.slice(6).trim());
    else if(cmd.startsWith('man ')) output=printHelp(cmd.slice(4).trim());
    else if(cmd.endsWith(' --help')) output=printHelp(cmd.split(' ')[0]==='kubectl'?'kubernetes':cmd.split(' ')[0]==='aws'?'cloud':cmd.split(' ')[0]==='gh'?'cicd':cmd.split(' ')[0]==='prometheus' || cmd.split(' ')[0]==='promtool'?'monitoring':cmd.split(' ')[0]);
    else if(cmd.startsWith('explain ')){
      const target=value.slice(8).trim().toLowerCase();
      const found=catalog.find(c=>{const pattern=c.cmd.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/<[^>]+>/g,'\\S+');return c.cmd.toLowerCase().startsWith(target) || new RegExp('^'+pattern+'$').test(target);});
      output=found?`${found.cmd}\n${found.desc}\n\nTool: ${found.tool.name}\nExample output:\n${found.out}`:`No matching command found for "${value.slice(8)}". Open a tool module or run <tool> --help.`;
      if(!found)type='error';
    } else {
      const found=catalog.find(c=>{
        const pattern=c.cmd.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/<[^>]+>/g,'\\S+');
        return new RegExp('^'+pattern+'$').test(cmd);
      });
      if(found) output=found.out;
      else {
        const cli=cmd.split(/\s+/)[0];
        const mapped={kubectl:'kubernetes',aws:'cloud',gh:'cicd',prometheus:'monitoring',promtool:'monitoring'};
        const module=tools.find(t=>t.id===(mapped[cli]||cli));
        if(module){output=`${cli}: command is not in this lab's supported examples.\nRun "${module.id} --help" or open ${module.name} in the Tool Library to see supported advanced commands.`;type='error';}
        else {output=`bash: ${value}: command not found\nRun help to see shell commands, or tools to list DevOps modules.`;type='error';}
      }
    }
    setTerminalLines([...base,{type,text:output}]);
    setCommandHistory(h=>[...h,value]);setHistoryIndex(-1);setCommand('');
  }
  function chooseTool(id){setSelectedTool(id);setActive('tools');}
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">D<span>_</span></div><div><b>devpath</b><small>LEARN · BUILD · SHIP</small></div></div>
      <div className="side-label">WORKSPACE</div>
      <button className={`side-link ${active==='overview'?'active':''}`} onClick={()=>setActive('overview')}><span>▦</span> Overview</button>
      <button className={`side-link ${active==='roadmap'?'active':''}`} onClick={()=>setActive('roadmap')}><span>⌁</span> Learning roadmap <em>5</em></button>
      <button className={`side-link ${active==='tools'?'active':''}`} onClick={()=>setActive('tools')}><span>⌘</span> Tool library <em>8</em></button>
      <button className={`side-link ${active==='terminal'?'active':''}`} onClick={()=>setActive('terminal')}><span>›_</span> Interactive terminal <i className="live-dot"/></button>
      <div className="side-label side-label-gap">YOUR LEARNING</div>
      <div className="mini-progress"><div className="mini-progress-top"><span>Overall progress</span><b>{pct}%</b></div><div className="progress-track"><span style={{width:`${pct}%`}}/></div><small>{done} of {total} topics completed</small></div>
      <div className="sidebar-bottom"><div className="avatar">D</div><div><b>DevOps learner</b><small>Keep the momentum going</small></div><span className="more">···</span></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>{active==='overview'?'Overview':active==='roadmap'?'Learning roadmap':active==='tools'?'Tool library':'Interactive terminal'}</b></div><div className="top-actions"><span className="streak">✦ <b>Learning mode</b></span><button className="icon-button" title="Notifications">♧</button><div className="top-avatar">D</div></div></header>
      <div className="content">
        {active==='overview' && <Overview pct={pct} done={done} total={total} chooseTool={chooseTool} setActive={setActive} completed={completed}/>}
        {active==='roadmap' && <Roadmap completed={completed} toggleTopic={toggleTopic} expanded={expanded} setExpanded={setExpanded} chooseTool={chooseTool}/>}
        {active==='tools' && <ToolLibrary filteredTools={filteredTools} query={query} setQuery={setQuery} chooseTool={chooseTool}/>}
        {active==='terminal' && <Terminal terminalLines={terminalLines} terminalRef={terminalRef} command={command} setCommand={setCommand} runCommand={runCommand} setTerminalLines={setTerminalLines} commandHistory={commandHistory} setHistoryIndex={setHistoryIndex}/>}
        {active==='tools-detail' && null}
        {active==='tools' && <ToolDetail tool={tool} completed={completed} toggleTopic={toggleTopic} runCommand={runCommand} setActive={setActive}/>}
      </div>
      <footer className="footer"><span>© 2026 DevPath</span><span>Built for the curious · <a href="https://github.com/Sumitgujar/online_shop" target="_blank" rel="noreferrer">Source repository ↗</a></span></footer>
    </main>
  </div>;
}
function PageHeading({eyebrow,title,desc,action}){return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>}
function Overview({pct,done,total,chooseTool,setActive,completed}){
 const next=tools.find(t=>!t.topics.every((_,i)=>completed[`${t.id}-${i}`]))||tools[0];
 return <><PageHeading eyebrow="YOUR DEVOPS COMMAND CENTER" title={<>Build your path to <span className="gradient-text">DevOps.</span></>} desc="A practical, structured journey from Linux fundamentals to production-grade infrastructure." action={<button className="primary-btn" onClick={()=>setActive('roadmap')}>Continue learning <span>→</span></button>}/>
 <section className="hero-card"><div className="hero-copy"><div className="hero-kicker"><span className="pulse"/> YOUR JOURNEY STARTS HERE</div><h2>From your first command<br/>to <span>shipping systems.</span></h2><p>Learn the tools, understand the workflows, and practice commands in a safe interactive lab.</p><button className="hero-btn" onClick={()=>setActive('roadmap')}>Explore learning roadmap <span>↗</span></button></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-core">D<span>_</span></div><div className="orbit-chip chip-linux">🐧 <b>Linux</b></div><div className="orbit-chip chip-docker">🐳 <b>Docker</b></div><div className="orbit-chip chip-kube">☸ <b>K8s</b></div><div className="orbit-chip chip-git">⑂ <b>Git</b></div></div><div className="hero-index">01 — 05 <span> / THE JOURNEY</span></div></section>
 <div className="section-title-row"><div><div className="eyebrow">AT A GLANCE</div><h2>Your learning dashboard</h2></div><button className="text-btn" onClick={()=>setActive('roadmap')}>View roadmap ↗</button></div>
 <div className="stats-grid"><Stat icon="◉" label="Overall progress" value={`${pct}%`} sub={`${done} topics completed`} color="purple"/><Stat icon="⌁" label="Learning paths" value="05" sub="From basics to advanced" color="blue"/><Stat icon="⌘" label="Tools to explore" value="08" sub="Industry-relevant stack" color="orange"/><Stat icon="▣" label="Practice lab" value="LIVE" sub="Safe simulated terminal" color="green"/></div>
 <div className="section-title-row"><div><div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h2>Recommended next</h2></div><span className="subtle">Based on your progress</span></div>
 <div className="next-card"><div className="tool-icon large" style={{'--tool-color':next.color}}>{next.icon}</div><div className="next-info"><div className="card-eyebrow">NEXT IN YOUR JOURNEY · {next.level.toUpperCase()}</div><h3>{next.name}</h3><p>{next.description}</p><div className="next-meta"><span>◷ 3–5 hours</span><span>•</span><span>{next.topics.length} topics</span></div></div><button className="outline-btn" onClick={()=>chooseTool(next.id)}>Open module <span>→</span></button></div>
 <div className="section-title-row"><div><div className="eyebrow">THE TOOLCHAIN</div><h2>Explore the ecosystem</h2></div><button className="text-btn" onClick={()=>setActive('tools')}>All tools ↗</button></div>
 <div className="tool-grid">{tools.slice(0,4).map(t=><button className="tool-card" key={t.id} onClick={()=>chooseTool(t.id)}><div className="tool-card-top"><div className="tool-icon" style={{'--tool-color':t.color}}>{t.icon}</div><span className="arrow-corner">↗</span></div><small>{t.category}</small><h3>{t.name}</h3><p>{t.description}</p><div className="tool-card-foot"><span>{t.level}</span><span>{t.topics.length} topics →</span></div></button>)}</div>
 <div className="terminal-promo"><div><div className="eyebrow">HANDS-ON PRACTICE</div><h2>Learn by doing, not just reading.</h2><p>Try common DevOps commands in a simulated terminal. No setup, no risk to your machine.</p><button className="primary-btn" onClick={()=>setActive('terminal')}>Launch interactive terminal <span>→</span></button></div><div className="promo-terminal"><div className="terminal-bar"><span/><span/><span/><b>devpath — terminal</b></div><div><i>learner@devpath</i>:~$ <b>docker ps</b><br/><span className="terminal-muted">CONTAINER ID&nbsp;&nbsp; IMAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; STATUS</span><br/>7fa21c09b812&nbsp;&nbsp; nginx&nbsp;&nbsp;&nbsp;&nbsp; <span className="terminal-green">Up 4 minutes</span><br/><i>learner@devpath</i>:~$ <span className="cursor">▍</span></div></div></div>
 </>;
}
function Stat({icon,label,value,sub,color}){return <div className="stat-card"><div className={`stat-icon ${color}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-sub">{sub}</div></div>}
function Roadmap({completed,toggleTopic,expanded,setExpanded,chooseTool}){
 return <><PageHeading eyebrow="THE LEARNING PATH" title={<>Your roadmap to <span className="gradient-text">DevOps.</span></>} desc="Follow the sequence, build real understanding, and check off each topic as you go."/><div className="roadmap-summary"><div><b>5 phases</b><span> · A practical learning sequence</span></div><div className="roadmap-legend"><span><i className="legend-dot done"/> Completed</span><span><i className="legend-dot"/> To do</span></div></div><div className="roadmap-list">{roadmap.map((phase,i)=>{const phaseTools=phase.items.map(id=>tools.find(t=>t.id===id));const count=phaseTools.reduce((n,t)=>n+t.topics.filter((_,j)=>completed[`${t.id}-${j}`]).length,0);const all=phaseTools.reduce((n,t)=>n+t.topics.length,0);return <div className={`phase ${expanded===phase.phase?'expanded':''}`} key={phase.phase}><button className="phase-head" onClick={()=>setExpanded(expanded===phase.phase?'':phase.phase)}><div className="phase-number">{phase.phase}</div><div className="phase-title"><div className="phase-meta">PHASE {phase.phase} <span>·</span> {phase.time}</div><h3>{phase.title}</h3><p>{phase.desc}</p></div><div className="phase-progress"><b>{count}/{all}</b><span>topics</span><div className="progress-track"><span style={{width:`${all?count/all*100:0}%`}}/></div></div><span className="chevron">{expanded===phase.phase?'−':'+'}</span></button>{expanded===phase.phase&&<div className="phase-body">{phaseTools.map(t=><div className="roadmap-tool" key={t.id}><div className="tool-icon small" style={{'--tool-color':t.color}}>{t.icon}</div><div className="roadmap-tool-main"><b>{t.name}</b><span>{t.topics.length} topics · {t.level}</span><div className="topic-checklist">{t.topics.map((topic,j)=><label key={topic} className={completed[`${t.id}-${j}`]?'checked':''}><input type="checkbox" checked={!!completed[`${t.id}-${j}`]} onChange={()=>toggleTopic(`${t.id}-${j}`)}/><span className="checkmark">{completed[`${t.id}-${j}`]?'✓':''}</span>{topic}</label>)}</div></div><button className="text-btn" onClick={()=>chooseTool(t.id)}>Study module ↗</button></div>)}</div>}</div>})}</div></>;
}
function ToolLibrary({filteredTools,query,setQuery,chooseTool}){return <><PageHeading eyebrow="THE DEVOPS TOOLBOX" title={<>Tools you'll <span className="gradient-text">work with.</span></>} desc="Understand what each tool does, why teams use it, and which commands to learn first."/><div className="search-wrap"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tools or categories..."/><kbd>⌘ K</kbd></div><div className="library-grid">{filteredTools.map(t=><button className="library-card" key={t.id} onClick={()=>chooseTool(t.id)}><div className="library-card-top"><div className="tool-icon" style={{'--tool-color':t.color}}>{t.icon}</div><span className="level-tag">{t.level}</span></div><div className="card-eyebrow">{t.category}</div><h3>{t.name}</h3><p>{t.description}</p><div className="library-card-bottom"><span>{t.topics.length} learning topics</span><b>Explore tool →</b></div></button>)}</div>{filteredTools.length===0&&<div className="empty-state">No tools match that search.</div>}</>}
function ToolDetail({tool,completed,toggleTopic,runCommand,setActive}){return <section className="tool-detail"><div className="detail-head"><div className="tool-icon detail-icon" style={{'--tool-color':tool.color}}>{tool.icon}</div><div><div className="card-eyebrow">{tool.category} · {tool.level}</div><h2>{tool.name}</h2><p>{tool.description}</p></div></div><div className="detail-grid"><div className="detail-main"><div className="detail-panel"><div className="panel-title">WHAT IT DOES</div><p>{tool.why}</p></div><div className="detail-panel"><div className="panel-title">COMMAND REFERENCE <span>{tool.commands.length} EXAMPLES</span></div>{tool.commands.map(c=><div className="command-reference" key={c.cmd}><div className="command-row"><code>{c.cmd}</code><button onClick={()=>{navigator.clipboard?.writeText(c.cmd)}} title="Copy command">▢</button></div><p>{c.desc}</p><pre>{c.out}</pre><button className="try-command" onClick={()=>{setActive('terminal');runCommand(c.cmd)}}>Try in terminal ↗</button></div>)}</div></div><div className="detail-side"><div className="detail-panel"><div className="panel-title">LEARNING CHECKLIST</div><div className="checklist">{tool.topics.map((topic,i)=><label key={topic} className={completed[`${tool.id}-${i}`]?'checked':''}><input type="checkbox" checked={!!completed[`${tool.id}-${i}`]} onChange={()=>toggleTopic(`${tool.id}-${i}`)}/><span className="checkmark">{completed[`${tool.id}-${i}`]?'✓':''}</span>{topic}</label>)}</div></div><div className="tip-panel"><b>💡 Learning tip</b><p>Don't memorize commands in isolation. Run them, inspect the output, and understand what changed.</p></div></div></div></section>}
function Terminal({terminalLines,terminalRef,command,setCommand,runCommand,setTerminalLines,commandHistory,setHistoryIndex}){
 const quick=['help','linux --help','git log --graph --oneline --decorate --all','docker compose up -d --build','kubectl get pods -A','kubectl rollout status deployment/online-app -n online-shop-app','gh run list','terraform plan -out=tfplan','aws sts get-caller-identity --output json','curl -s http://localhost:9090/api/v1/targets'];
 const onKeyDown=(e)=>{
  if(e.key==='ArrowUp'){e.preventDefault();setHistoryIndex(i=>{const next=Math.min(i+1,commandHistory.length-1);setCommand(commandHistory[commandHistory.length-1-next]||'');return next;});}
  if(e.key==='ArrowDown'){e.preventDefault();setHistoryIndex(i=>{const next=Math.max(i-1,-1);setCommand(next<0?'':commandHistory[commandHistory.length-1-next]||'');return next;});}
  if(e.key==='Tab'){e.preventDefault();const options=['help','tools','history','linux --help','git --help','docker --help','kubernetes --help','cicd --help','terraform --help','cloud --help','monitoring --help'];const match=options.find(x=>x.startsWith(command.toLowerCase()));if(match)setCommand(match);}
 };
 return <><PageHeading eyebrow="PRACTICE ENVIRONMENT" title={<>Your command line, <span className="gradient-text">in the browser.</span></>} desc="Practice realistic Linux and DevOps CLI workflows with command history, help pages, examples, and simulated output." action={<span className="sim-badge"><i/> SIMULATED ENVIRONMENT</span>}/><div className="terminal-layout"><div className="terminal-window"><div className="terminal-titlebar"><div className="traffic"><i/><i/><i/></div><span>learner@devpath: ~/lab</span><button onClick={()=>setTerminalLines([])}>Clear session ↗</button></div><div className="terminal-output" ref={terminalRef}>{terminalLines.map((line,i)=><div className={`terminal-line ${line.type}`} key={i}>{line.type==='input'?<span className="prompt">learner@devpath:~$ </span>:null}<span>{line.text}</span></div>)}<form className="terminal-input-row" onSubmit={e=>{e.preventDefault();runCommand(command)}}><span className="prompt">learner@devpath:~$</span><input autoFocus value={command} onKeyDown={onKeyDown} onChange={e=>setCommand(e.target.value)} spellCheck="false" autoComplete="off" placeholder="Try: kubectl get pods -A" /><span className="cursor">▍</span></form></div><div className="terminal-status"><span><i/> SIMULATED SHELL</span><span>bash-like · ↑/↓ history · Tab completion</span></div></div><div className="terminal-help"><div className="detail-panel"><div className="panel-title">ADVANCED COMMANDS <span>CLICK TO RUN</span></div><p>Start with a real workflow from the toolchain:</p>{quick.map(c=><button className="quick-command" key={c} onClick={()=>runCommand(c)}><code>{c}</code><span>↗</span></button>)}</div><div className="safety-note"><b>🔒 Safe by design</b><p>Outputs are curated simulations. No shell process is launched, and no local files, credentials, cloud account, containers, or Kubernetes cluster are accessed or changed.</p></div></div></div><div className="terminal-note"><b>Practice loop:</b> run <code>docker --help</code> or <code>kubectl --help</code> → inspect the command catalogue → run an example → use <code>explain &lt;command&gt;</code>. Use ↑ / ↓ for history and Tab for basic completion.</div></>}

export default App;
