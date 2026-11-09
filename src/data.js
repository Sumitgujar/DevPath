export const tools = [
  {
    "id": "linux",
    "name": "Linux",
    "icon": "🐧",
    "color": "#f5b942",
    "category": "FOUNDATIONS",
    "level": "Beginner",
    "description": "The operating system and command-line foundation behind most production servers.",
    "why": "DevOps engineers use Linux to manage servers, inspect processes, configure permissions, read logs and automate repetitive work.",
    "topics": [
      "Filesystem hierarchy",
      "Users, groups and permissions",
      "Processes and signals",
      "Package managers",
      "Networking basics",
      "Shell scripting"
    ],
    "commands": [
      {
        "cmd": "pwd",
        "desc": "Print the current working directory.",
        "out": "/home/learner/devpath-lab"
      },
      {
        "cmd": "ls -la",
        "desc": "List files, including hidden files, with permissions and ownership.",
        "out": "drwxr-xr-x  5 learner learner 4096 Nov 08 09:20 .\n-rw-r--r--  1 learner learner  220 Nov 08 09:20 .bashrc\ndrwxr-xr-x  2 learner learner 4096 Nov 08 09:20 projects"
      },
      {
        "cmd": "whoami",
        "desc": "Show the current user.",
        "out": "learner"
      },
      {
        "cmd": "df -h",
        "desc": "Show filesystem disk usage in a human-readable format.",
        "out": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p2  468G  277G  167G  63% /"
      },
      {
        "cmd": "ps aux",
        "desc": "List running processes.",
        "out": "USER       PID %CPU %MEM COMMAND\nroot         1  0.0  0.1 /sbin/init\nlearner   1420  0.2  1.4 /usr/bin/bash"
      },
      {
        "cmd": "sudo apt update",
        "desc": "Refresh package indexes from configured repositories.",
        "out": "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done"
      },
      {
        "cmd": "sudo apt install nginx -y",
        "desc": "Install Nginx without an interactive confirmation prompt.",
        "out": "nginx is already the newest version.\n0 upgraded, 0 newly installed, 0 to remove."
      },
      {
        "cmd": "systemctl status nginx",
        "desc": "Inspect the Nginx systemd service state.",
        "out": "● nginx.service - A high performance web server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n   Active: active (running)"
      },
      {
        "cmd": "journalctl -u nginx -n 20 --no-pager",
        "desc": "Read the latest 20 log entries for Nginx.",
        "out": "Nov 08 10:02:11 devpath nginx[812]: nginx started\nNov 08 10:03:04 devpath nginx[812]: worker process started"
      },
      {
        "cmd": "ip addr show",
        "desc": "Inspect network interfaces and assigned IP addresses.",
        "out": "2: eth0: <BROADCAST,MULTICAST,UP>\n    inet 192.168.1.24/24 brd 192.168.1.255"
      },
      {
        "cmd": "ss -tulpn",
        "desc": "List listening TCP and UDP sockets with process information.",
        "out": "Netid State  Local Address:Port  Process\ntcp   LISTEN 0.0.0.0:22         sshd\ntcp   LISTEN 0.0.0.0:80         nginx"
      },
      {
        "cmd": "chmod 750 deploy.sh",
        "desc": "Set owner rwx, group rx, and no permissions for others.",
        "out": "Permissions updated: -rwxr-x--- deploy.sh"
      },
      {
        "cmd": "find /var/log -type f -name \"*.log\"",
        "desc": "Find log files beneath /var/log.",
        "out": "/var/log/syslog\n/var/log/auth.log\n/var/log/nginx/access.log"
      },
      {
        "cmd": "free -h",
        "desc": "Display RAM and swap usage in human-readable units.",
        "out": "               total   used   free\nMem:            7.6Gi  4.1Gi  1.2Gi\nSwap:           4.0Gi  0B"
      }
    ]
  },
  {
    "id": "git",
    "name": "Git & GitHub",
    "icon": "⑂",
    "color": "#f07845",
    "category": "FOUNDATIONS",
    "level": "Beginner",
    "description": "Version control for tracking changes and collaborating safely on code.",
    "why": "Infrastructure and application changes need traceability, review and rollback. Git provides the change history; GitHub hosts collaboration workflows.",
    "topics": [
      "Repository, commits and staging",
      "Branches and merging",
      "Remote repositories",
      "Pull requests and code review",
      "Merge conflicts",
      "GitHub Actions basics"
    ],
    "commands": [
      {
        "cmd": "git --version",
        "desc": "Check the installed Git version.",
        "out": "git version 2.43.0"
      },
      {
        "cmd": "git status",
        "desc": "Show the working tree and staged changes.",
        "out": "On branch main\nYour branch is up to date with origin/main.\nnothing to commit, working tree clean"
      },
      {
        "cmd": "git branch",
        "desc": "List local branches.",
        "out": "* main\n  feature/monitoring"
      },
      {
        "cmd": "git log --oneline -5",
        "desc": "Show the latest five commits in compact form.",
        "out": "a91d2c4 Add deployment workflow\n2f8b611 Configure Docker build\n7c4d901 Add API health endpoint"
      },
      {
        "cmd": "git switch -c feature/docs",
        "desc": "Create and switch to a new branch.",
        "out": "Switched to a new branch 'feature/docs'"
      },
      {
        "cmd": "git remote -v",
        "desc": "Show configured remote repositories.",
        "out": "origin  https://github.com/example/app.git (fetch)\norigin  https://github.com/example/app.git (push)"
      },
      {
        "cmd": "git fetch --all --prune",
        "desc": "Fetch all remotes and remove stale remote-tracking refs.",
        "out": "From https://github.com/example/app\n * [new branch]      staging -> origin/staging"
      },
      {
        "cmd": "git diff --staged",
        "desc": "Review changes currently in the staging area.",
        "out": "diff --git a/app.js b/app.js\n+ add health-check endpoint"
      },
      {
        "cmd": "git stash push -m \"wip\"",
        "desc": "Temporarily save uncommitted changes in a stash.",
        "out": "Saved working directory and index state On main: wip"
      },
      {
        "cmd": "git cherry-pick a91d2c4",
        "desc": "Apply one existing commit onto the current branch.",
        "out": "[main 3bc91f2] Add deployment workflow\n 2 files changed, 18 insertions(+)"
      },
      {
        "cmd": "git rebase origin/main",
        "desc": "Replay local commits on top of the latest origin/main.",
        "out": "Successfully rebased and updated refs/heads/feature/docs."
      },
      {
        "cmd": "git tag -a v1.0.0 -m \"release 1.0.0\"",
        "desc": "Create an annotated release tag.",
        "out": "Annotated tag v1.0.0 created."
      },
      {
        "cmd": "git push -u origin feature/api",
        "desc": "Push a branch and set its upstream tracking branch.",
        "out": "branch feature/api set up to track origin/feature/api."
      },
      {
        "cmd": "git log --graph --oneline --decorate --all",
        "desc": "Visualize branch and merge history.",
        "out": "* 3bc91f2 (HEAD -> main) Add deployment workflow\n| * 7f12a90 (origin/feature/api) Add API endpoint\n|/"
      }
    ]
  },
  {
    "id": "docker",
    "name": "Docker",
    "icon": "🐳",
    "color": "#55a8ee",
    "category": "CONTAINERS",
    "level": "Beginner",
    "description": "Package an application and its dependencies into portable containers.",
    "why": "Containers make application environments more consistent from a laptop to CI and production.",
    "topics": [
      "Images vs containers",
      "Dockerfile instructions",
      "Build and tag images",
      "Volumes and networks",
      "Compose",
      "Image registries and security"
    ],
    "commands": [
      {
        "cmd": "docker --version",
        "desc": "Check the Docker CLI version.",
        "out": "Docker version 27.3.1, build ce12230"
      },
      {
        "cmd": "docker ps",
        "desc": "List running containers.",
        "out": "CONTAINER ID   IMAGE          STATUS         PORTS\n7fa21c09b812   nginx:latest   Up 4 minutes   0.0.0.0:8080->80/tcp"
      },
      {
        "cmd": "docker images",
        "desc": "List locally available images.",
        "out": "REPOSITORY   TAG       IMAGE ID       SIZE\nnginx        latest    4f1b4...       188MB\nnode         20-alpine 7d3a9...       135MB"
      },
      {
        "cmd": "docker run -d -p 8080:80 nginx",
        "desc": "Run Nginx in the background and map host port 8080 to container port 80.",
        "out": "8f3a6d91c2e4b7a0d51c"
      },
      {
        "cmd": "docker logs <container>",
        "desc": "Read a container’s standard output and error logs.",
        "out": "2026/11/08 09:42:11 [notice] nginx/1.27.2 started"
      },
      {
        "cmd": "docker build -t devpath-api:1.0 .",
        "desc": "Build an image from the Dockerfile in the current directory.",
        "out": "[+] Building 8.4s (10/10) FINISHED\n => naming to docker.io/library/devpath-api:1.0"
      },
      {
        "cmd": "docker exec -it <container> sh",
        "desc": "Open an interactive shell inside a running container.",
        "out": "/ # whoami\nroot\n/ # exit"
      },
      {
        "cmd": "docker inspect <container>",
        "desc": "Show low-level container configuration and runtime metadata.",
        "out": "\"State\": { \"Status\": \"running\", \"Running\": true },\n\"NetworkMode\": \"bridge\""
      },
      {
        "cmd": "docker stats --no-stream",
        "desc": "Show a one-time CPU, memory, and network usage snapshot.",
        "out": "CONTAINER   CPU %   MEM USAGE / LIMIT\napi         0.42%   86MiB / 2GiB"
      },
      {
        "cmd": "docker network ls",
        "desc": "List Docker networks.",
        "out": "NETWORK ID   NAME      DRIVER\n0a12bc       bridge    bridge\n2c34de       app-net   bridge"
      },
      {
        "cmd": "docker volume ls",
        "desc": "List Docker-managed volumes.",
        "out": "DRIVER    VOLUME NAME\nlocal     postgres_data\nlocal     app_uploads"
      },
      {
        "cmd": "docker compose up -d --build",
        "desc": "Build and start services defined in compose.yaml.",
        "out": "[+] Building 4.2s\n[+] Running 2/2\n ✔ Container api      Started\n ✔ Container database Started"
      },
      {
        "cmd": "docker system df",
        "desc": "Summarize disk usage by images, containers, and volumes.",
        "out": "TYPE            TOTAL   ACTIVE   SIZE\nImages          8       3        2.1GB\nContainers      4       2        120MB"
      },
      {
        "cmd": "docker image prune -f",
        "desc": "Remove dangling images not referenced by containers.",
        "out": "Deleted Images:\nuntagged: node:old\nTotal reclaimed space: 312MB"
      }
    ]
  },
  {
    "id": "kubernetes",
    "name": "Kubernetes",
    "icon": "☸",
    "color": "#718cf4",
    "category": "ORCHESTRATION",
    "level": "Intermediate",
    "description": "Orchestrate containers across a cluster with declarative configuration.",
    "why": "Kubernetes schedules workloads, manages service discovery, performs rollouts and helps recover failed containers.",
    "topics": [
      "Pods, ReplicaSets and Deployments",
      "Services and DNS",
      "ConfigMaps and Secrets",
      "Namespaces and RBAC",
      "Ingress and networking",
      "Probes, resources and autoscaling"
    ],
    "commands": [
      {
        "cmd": "kubectl version --client",
        "desc": "Print the client version.",
        "out": "Client Version: v1.31.2"
      },
      {
        "cmd": "kubectl get nodes",
        "desc": "List cluster nodes.",
        "out": "NAME       STATUS   ROLES           AGE   VERSION\nkind-main  Ready    control-plane   12d   v1.31.2"
      },
      {
        "cmd": "kubectl get pods -A",
        "desc": "List pods across all namespaces.",
        "out": "NAMESPACE     NAME                         READY   STATUS    AGE\ndefault       web-6c9d8f7b9f-x2p4k         1/1     Running   3h\nkube-system   coredns-7db6d8ff4d-j9q2m    1/1     Running   12d"
      },
      {
        "cmd": "kubectl describe pod <pod>",
        "desc": "Inspect pod details and recent events.",
        "out": "Name:         online-app-7cf4f78c6-a1b2c\nNamespace:    online-shop-app\nStatus:       Running\nContainers:   web (nginx:1.27)"
      },
      {
        "cmd": "kubectl apply -f deployment.yaml",
        "desc": "Create or update resources from a manifest.",
        "out": "deployment.apps/online-app configured"
      },
      {
        "cmd": "kubectl get deployments -A",
        "desc": "List deployments in every namespace.",
        "out": "NAMESPACE   NAME        READY   UP-TO-DATE   AVAILABLE\nshop        online-app  2/2     2            2"
      },
      {
        "cmd": "kubectl get svc -n online-shop-app",
        "desc": "List Services in the online-shop-app namespace.",
        "out": "NAME        TYPE        CLUSTER-IP      PORT(S)\nonline-app  ClusterIP   10.96.147.126   5173/TCP"
      },
      {
        "cmd": "kubectl get events --sort-by=.metadata.creationTimestamp",
        "desc": "Show cluster events ordered by creation time.",
        "out": "LAST SEEN   TYPE     REASON      OBJECT\n2m          Normal   Scheduled   pod/online-app-7cf...\n1m          Normal   Pulled      pod/online-app-7cf..."
      },
      {
        "cmd": "kubectl logs <pod> --tail=100",
        "desc": "Read the last 100 log lines from a pod.",
        "out": "2026-11-08T10:22:01Z server listening on :5173\n2026-11-08T10:22:05Z GET /health 200"
      },
      {
        "cmd": "kubectl exec -it <pod> -- sh",
        "desc": "Start a shell inside a pod container.",
        "out": "/app $ pwd\n/app\n/app $ exit"
      },
      {
        "cmd": "kubectl rollout status deployment/online-app -n online-shop-app",
        "desc": "Wait for a deployment rollout to complete.",
        "out": "deployment \"online-app\" successfully rolled out"
      },
      {
        "cmd": "kubectl rollout undo deployment/online-app -n online-shop-app",
        "desc": "Roll back a deployment to its previous revision.",
        "out": "deployment.apps/online-app rolled back"
      },
      {
        "cmd": "kubectl scale deployment/online-app --replicas=3 -n online-shop-app",
        "desc": "Scale a deployment to three replicas.",
        "out": "deployment.apps/online-app scaled"
      },
      {
        "cmd": "kubectl describe service online-app -n online-shop-app",
        "desc": "Inspect Service selectors, ports, and endpoints.",
        "out": "Name: online-app\nType: ClusterIP\nPort: 5173/TCP\nEndpoints: 10.244.0.12:5173,10.244.0.13:5173"
      },
      {
        "cmd": "kubectl top pods -n online-shop-app",
        "desc": "Show CPU and memory usage for namespace pods.",
        "out": "NAME                         CPU(cores)   MEMORY(bytes)\nonline-app-7cf4f78c6-a1b2c  4m           48Mi"
      },
      {
        "cmd": "kubectl config get-contexts",
        "desc": "List Kubernetes contexts in the kubeconfig.",
        "out": "CURRENT   NAME       CLUSTER    AUTHINFO\n*         kind-main  kind-main  kind-main"
      }
    ]
  },
  {
    "id": "cicd",
    "name": "CI/CD · GitHub Actions",
    "icon": "⚙",
    "color": "#c18af5",
    "category": "AUTOMATION",
    "level": "Intermediate",
    "description": "Automate testing, building and delivery whenever code changes.",
    "why": "A reliable pipeline catches issues early and makes releases repeatable instead of manual and error-prone.",
    "topics": [
      "CI vs CD",
      "Workflow YAML",
      "Jobs, steps and runners",
      "Secrets and environments",
      "Artifacts and caching",
      "Deployment strategies"
    ],
    "commands": [
      {
        "cmd": "gh --version",
        "desc": "Check the GitHub CLI version.",
        "out": "gh version 2.58.0 (2024-09-10)"
      },
      {
        "cmd": "gh workflow list",
        "desc": "List workflows in the current repository.",
        "out": "NAME               STATE   ID\nCI                 active  123456\nDeploy to staging  active  123457"
      },
      {
        "cmd": "gh run list",
        "desc": "List recent workflow runs.",
        "out": "STATUS  TITLE                  WORKFLOW\n✓       Add health check      CI\n✓       Update Dockerfile     CI\n×       Bump dependencies     CI"
      },
      {
        "cmd": "gh repo view --web",
        "desc": "Open the current repository on GitHub (simulated).",
        "out": "Repository: example/devpath\nVisibility: Public\nDefault branch: main"
      },
      {
        "cmd": "gh workflow view CI",
        "desc": "Inspect the CI workflow definition and status.",
        "out": "Workflow: CI\nState: active\nTriggers: push, pull_request"
      },
      {
        "cmd": "gh run view 123456 --log",
        "desc": "Inspect a workflow run and its logs.",
        "out": "✓ Checkout repository\n✓ Install dependencies\n✓ Run tests\n✓ Build container image"
      },
      {
        "cmd": "gh run rerun 123456 --failed",
        "desc": "Rerun only failed jobs from a workflow run.",
        "out": "✓ Requested a rerun of failed jobs for run 123456"
      },
      {
        "cmd": "gh secret list",
        "desc": "List repository Actions secret names (values stay hidden).",
        "out": "NAME                 UPDATED\nAWS_ROLE_ARN         2026-11-01\nREGISTRY_TOKEN       2026-11-03"
      },
      {
        "cmd": "gh pr list --state open",
        "desc": "List open pull requests.",
        "out": "ID   TITLE                    BRANCH\n42   Add health endpoint      feature/health\n39   Update deployment chart  feature/helm"
      },
      {
        "cmd": "gh run watch 123456",
        "desc": "Watch a workflow run until it completes.",
        "out": "Refreshing run status...\n✓ CI / build-and-test completed successfully"
      }
    ]
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "icon": "⌘",
    "color": "#a58cf5",
    "category": "INFRASTRUCTURE AS CODE",
    "level": "Intermediate",
    "description": "Define cloud and infrastructure resources using declarative configuration.",
    "why": "Infrastructure as Code makes environments reviewable, repeatable and easier to recreate.",
    "topics": [
      "HCL syntax and providers",
      "Resources and data sources",
      "Variables and outputs",
      "State and remote backends",
      "Modules",
      "Plan, apply and destroy safely"
    ],
    "commands": [
      {
        "cmd": "terraform version",
        "desc": "Check Terraform CLI version.",
        "out": "Terraform v1.9.8"
      },
      {
        "cmd": "terraform init",
        "desc": "Initialize a working directory and download providers.",
        "out": "Initializing the backend...\nInitializing provider plugins...\nTerraform has been successfully initialized!"
      },
      {
        "cmd": "terraform fmt",
        "desc": "Format Terraform configuration files.",
        "out": "main.tf"
      },
      {
        "cmd": "terraform validate",
        "desc": "Validate configuration syntax and internal consistency.",
        "out": "Success! The configuration is valid."
      },
      {
        "cmd": "terraform plan",
        "desc": "Preview proposed infrastructure changes.",
        "out": "Plan: 2 to add, 0 to change, 0 to destroy."
      },
      {
        "cmd": "terraform state list",
        "desc": "List resources tracked in the current Terraform state.",
        "out": "aws_instance.web\naws_security_group.web\naws_s3_bucket.assets"
      },
      {
        "cmd": "terraform output",
        "desc": "Display root module output values.",
        "out": "public_ip = \"203.0.113.10\"\nweb_bucket = \"devpath-assets\""
      },
      {
        "cmd": "terraform providers",
        "desc": "Show providers required by the configuration.",
        "out": "Providers required by configuration:\n.\n└── provider[registry.terraform.io/hashicorp/aws] ~> 5.0"
      },
      {
        "cmd": "terraform workspace list",
        "desc": "List Terraform workspaces.",
        "out": "  default\n* staging\n  production"
      },
      {
        "cmd": "terraform workspace new dev",
        "desc": "Create and select a workspace named dev.",
        "out": "Created and switched to workspace \"dev\""
      },
      {
        "cmd": "terraform plan -out=tfplan",
        "desc": "Save a proposed infrastructure plan to a file.",
        "out": "Plan: 1 to add, 1 to change, 0 to destroy.\nSaved the plan to: tfplan"
      },
      {
        "cmd": "terraform apply tfplan",
        "desc": "Apply a previously saved execution plan.",
        "out": "Apply complete! Resources: 1 added, 1 changed, 0 destroyed."
      },
      {
        "cmd": "terraform state show aws_instance.web",
        "desc": "Show attributes of one resource in state.",
        "out": "resource \"aws_instance\" \"web\" {\n    instance_type = \"t3.micro\"\n    ami           = \"ami-0123456789abcdef0\"\n}"
      }
    ]
  },
  {
    "id": "cloud",
    "name": "Cloud · AWS",
    "icon": "☁",
    "color": "#f5a94d",
    "category": "CLOUD",
    "level": "Intermediate",
    "description": "Understand the compute, networking, identity and storage services used to run systems.",
    "why": "Most DevOps roles operate workloads on a cloud platform. Learn core concepts before memorizing service names.",
    "topics": [
      "IAM users, roles and policies",
      "VPC, subnets and routing",
      "EC2 and load balancing",
      "S3 and storage classes",
      "CloudWatch monitoring",
      "Cost and security fundamentals"
    ],
    "commands": [
      {
        "cmd": "aws --version",
        "desc": "Check the AWS CLI version.",
        "out": "aws-cli/2.18.12 Python/3.12.6 Linux/6.8"
      },
      {
        "cmd": "aws sts get-caller-identity",
        "desc": "Show the identity used by the configured AWS CLI credentials.",
        "out": "{\n  \"Account\": \"123456789012\",\n  \"Arn\": \"arn:aws:iam::123456789012:user/learner\"\n}"
      },
      {
        "cmd": "aws s3 ls",
        "desc": "List S3 buckets visible to the configured identity.",
        "out": "2026-10-10 12:00:00 devpath-learning-assets"
      },
      {
        "cmd": "aws ec2 describe-instances --output table",
        "desc": "List EC2 instance details in a readable table.",
        "out": "InstanceId       State     Type\ni-0abc123def456  running   t3.micro"
      },
      {
        "cmd": "aws s3 ls s3://devpath-learning-assets/",
        "desc": "List objects in a specific S3 bucket.",
        "out": "2026-11-08 09:10:12  18420  build.zip\n2026-11-08 09:12:44  5021   index.html"
      },
      {
        "cmd": "aws iam list-roles --query \"Roles[].RoleName\"",
        "desc": "Query IAM role names with AWS CLI JMESPath syntax.",
        "out": "[\n  \"DevPathDeployRole\",\n  \"ReadOnlyAuditRole\"\n]"
      },
      {
        "cmd": "aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE",
        "desc": "List successfully created or updated CloudFormation stacks.",
        "out": "StackName             StackStatus\ndevpath-network       CREATE_COMPLETE\ndevpath-app           UPDATE_COMPLETE"
      },
      {
        "cmd": "aws logs describe-log-groups --log-group-name-prefix /app/",
        "desc": "Find CloudWatch log groups by name prefix.",
        "out": "/app/api\n/app/worker"
      },
      {
        "cmd": "aws sts get-caller-identity --output json",
        "desc": "Verify which AWS account and principal the CLI is using.",
        "out": "{\n  \"Account\": \"123456789012\",\n  \"Arn\": \"arn:aws:iam::123456789012:role/DevPathDeployRole\"\n}"
      },
      {
        "cmd": "aws configure list",
        "desc": "Show where AWS CLI configuration values are sourced from.",
        "out": "NAME       VALUE                 TYPE\nprofile    default               env\nregion     ap-south-1             config\naccess_key ****************ABCD shared-credentials-file"
      }
    ]
  },
  {
    "id": "monitoring",
    "name": "Monitoring",
    "icon": "📈",
    "color": "#53c9a6",
    "category": "OBSERVABILITY",
    "level": "Advanced",
    "description": "Measure system health with metrics, logs, traces and actionable alerts.",
    "why": "You cannot reliably operate what you cannot observe. Monitoring helps detect incidents and diagnose performance issues.",
    "topics": [
      "Metrics, logs and traces",
      "Prometheus fundamentals",
      "PromQL queries",
      "Grafana dashboards",
      "Alert rules and Alertmanager",
      "SLI, SLO and incident response"
    ],
    "commands": [
      {
        "cmd": "prometheus --version",
        "desc": "Check Prometheus version.",
        "out": "prometheus, version 2.54.1"
      },
      {
        "cmd": "docker logs prometheus",
        "desc": "Inspect Prometheus container logs.",
        "out": "level=info msg=\"Server is ready to receive web requests.\""
      },
      {
        "cmd": "curl localhost:9090/-/healthy",
        "desc": "Check the Prometheus health endpoint.",
        "out": "Prometheus is Healthy."
      },
      {
        "cmd": "curl -s http://localhost:9090/api/v1/targets",
        "desc": "Query Prometheus target health through its HTTP API.",
        "out": "{\"status\":\"success\",\"data\":{\"activeTargets\":[{\"health\":\"up\",\"scrapeUrl\":\"http://node-exporter:9100/metrics\"}]}}"
      },
      {
        "cmd": "curl -s http://localhost:9090/api/v1/query?query=up",
        "desc": "Run an instant PromQL query through the Prometheus API.",
        "out": "{\"status\":\"success\",\"data\":{\"resultType\":\"vector\",\"result\":[{\"metric\":{\"job\":\"node\"},\"value\":[1794132000,\"1\"]}]}}"
      },
      {
        "cmd": "docker compose logs --tail=100 prometheus grafana",
        "desc": "Read recent logs from Prometheus and Grafana services.",
        "out": "prometheus  | Server is ready to receive web requests.\ngrafana     | HTTP Server Listen address=:3000"
      },
      {
        "cmd": "curl -s http://localhost:3000/api/health",
        "desc": "Check Grafana health endpoint.",
        "out": "{\"database\":\"ok\",\"version\":\"11.2.0\",\"commit\":\"abc123\"}"
      },
      {
        "cmd": "promtool check config prometheus.yml",
        "desc": "Validate Prometheus configuration syntax.",
        "out": "Checking prometheus.yml\n SUCCESS: 1 rule files found"
      },
      {
        "cmd": "promtool query instant http://localhost:9090 up",
        "desc": "Evaluate an instant PromQL query from the CLI.",
        "out": " up{instance=\"node-exporter:9100\",job=\"node\"} 1"
      },
      {
        "cmd": "curl -s http://localhost:9093/-/ready",
        "desc": "Check whether Alertmanager is ready.",
        "out": "OK"
      }
    ]
  }
];

export const roadmap = [
  {
    "phase": "01",
    "title": "Foundations",
    "time": "2–3 weeks",
    "desc": "Get comfortable with the command line and source control.",
    "items": [
      "linux",
      "git"
    ]
  },
  {
    "phase": "02",
    "title": "Containers",
    "time": "1–2 weeks",
    "desc": "Package and run applications consistently.",
    "items": [
      "docker"
    ]
  },
  {
    "phase": "03",
    "title": "Orchestration",
    "time": "2–3 weeks",
    "desc": "Deploy and operate container workloads.",
    "items": [
      "kubernetes"
    ]
  },
  {
    "phase": "04",
    "title": "Automation & IaC",
    "time": "2–3 weeks",
    "desc": "Automate delivery and provision infrastructure.",
    "items": [
      "cicd",
      "terraform"
    ]
  },
  {
    "phase": "05",
    "title": "Cloud & Observability",
    "time": "3–4 weeks",
    "desc": "Run resilient systems and understand their health.",
    "items": [
      "cloud",
      "monitoring"
    ]
  }
];
