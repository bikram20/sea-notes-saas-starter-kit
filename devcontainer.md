# Development Container Configuration

This document explains the devcontainer setup and validation commands for running SeaNotes locally in a containerized development environment.

## What is the DevContainer?

The devcontainer provides a fully containerized development environment that includes:

- **Application Container**: Ubuntu 22.04 with Node.js 20, development tools, and project dependencies
- **PostgreSQL Database**: Version 15 running on port 5432
- **MinIO Object Storage**: S3-compatible storage for file uploads (API on port 9000, Console on port 8900)
- **Development Tools**: Claude Code CLI, PostgreSQL client, Docker tools, and VS Code extensions

### Benefits

- **Consistent Environment**: Everyone on the team uses identical development setup
- **Isolated Dependencies**: All services run in containers, no local installation needed
- **Pre-configured Tools**: VS Code extensions, linters, formatters automatically installed
- **Easy Onboarding**: New developers can start coding in minutes

## Validation Commands

Before running the devcontainer, you can validate the configuration without actually starting it:

### 1. Validate Docker Compose Configuration

```bash
docker compose -f docker-compose.yml config --quiet
```

**What it validates:**
- YAML syntax correctness
- Service definitions (app, postgres, minio)
- Port mappings and network configuration
- Volume mounts and environment variables
- Dependencies between services

**Expected output:** Silent (no output) means configuration is valid

### 2. Validate DevContainer Configuration

```bash
npx --yes @devcontainers/cli read-configuration --workspace-folder .
```

**What it validates:**
- devcontainer.json syntax and structure
- Docker Compose file reference
- Port forwarding configuration (3000, 5432, 9000, 8900)
- Volume mounts (Claude config directory)
- VS Code extensions list
- Environment variable mappings

**Expected output:** JSON configuration object with all merged settings

### 3. Validate Dockerfile Build

```bash
docker build --check -f .devcontainer/Dockerfile .
```

**What it validates:**
- Dockerfile syntax
- Base image availability (ubuntu:22.04)
- RUN command correctness
- Package installation steps
- User and permission setup
- Build warnings or errors

**Expected output:** "Check complete, no warnings found"

## Running the DevContainer

### Using VS Code or Cursor

1. Install the "Dev Containers" extension
2. Open the project folder
3. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
4. Select "Dev Containers: Reopen in Container"
5. Wait for the container to build and start

### Using CLI

```bash
# Build and start the devcontainer
npx @devcontainers/cli up --workspace-folder .

# Execute commands in the running container
npx @devcontainers/cli exec --workspace-folder . npm install
```

## Services and Ports

| Service | Port | Purpose |
|---------|------|---------|
| Next.js App | 3000 | Main application development server |
| PostgreSQL | 5432 | Database server |
| MinIO API | 9000 | S3-compatible object storage API |
| MinIO Console | 8900 | Web UI for MinIO administration |

## Environment Configuration

The devcontainer automatically:
- Mounts your local `.claude` directory to `/home/devcontainer/.claude`
- Passes through `DIGITALOCEAN_API_TOKEN` environment variable
- Uses default PostgreSQL credentials (postgres/postgres/saas_kit_db)
- Configures MinIO with default credentials (minio/minio12345)

## Troubleshooting

### Container fails to start

1. Run all three validation commands above
2. Check Docker is running: `docker info`
3. Verify no port conflicts: `lsof -i :3000,5432,9000,8900`

### Database connection issues

- PostgreSQL runs on `postgres:5432` inside the container network
- Use connection string: `postgresql://postgres:postgres@postgres:5432/saas_kit_db`

### MinIO storage issues

- Access MinIO console at `http://localhost:8900`
- Login: `minio` / `minio12345`
- Configure AWS SDK to use `http://minio:9000` as endpoint