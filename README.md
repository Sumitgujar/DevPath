# DevPath — DevOps learning guide

A React + Vite learning dashboard with a tool library, roadmap, progress checklist, and a browser-based DevOps command simulator.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Terminal simulator

The terminal includes:
- 101 curated command examples across Linux, Git/GitHub, Docker, Kubernetes, GitHub Actions, Terraform, AWS, and Monitoring.
- Tool help pages: `linux --help`, `git --help`, `docker --help`, `kubernetes --help`, `cicd --help`, `terraform --help`, `cloud --help`, `monitoring --help`.
- `help`, `tools`, `man <tool>`, `explain <command>`, `history`, `pwd`, `ls`, `whoami`, `uname -a`, `date`, `cat README.md`, `echo <text>`, and `clear`.
- Placeholder argument matching for examples such as `docker logs <container>` and `kubectl logs <pod> --tail=100`.
- Up/down arrow command history and basic Tab completion.

**Important:** this is a curated simulator, not a real shell. It does not launch processes, read or write local files, access credentials, connect to Docker/Kubernetes/AWS, or change real infrastructure. Commands return predefined educational output. Do not treat the sample outputs as live system state.

## Progress

Learning checklist progress is stored in the browser's `localStorage`.
