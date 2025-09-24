FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates git unzip jq less procps build-essential \
    python3 python3-pip postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && corepack enable

RUN arch="$(uname -m)"; \
    case "$arch" in \
      x86_64) MC_ARCH="linux-amd64" ;; \
      aarch64|arm64) MC_ARCH="linux-arm64" ;; \
      *) MC_ARCH="linux-amd64" ;; \
    esac && \
    curl -fsSL "https://dl.min.io/client/mc/release/${MC_ARCH}/mc" -o /usr/local/bin/mc && \
    chmod +x /usr/local/bin/mc

RUN arch="$(uname -m)"; \
    case "$arch" in \
      x86_64) DOCTL_ARCH="linux-amd64" ;; \
      aarch64|arm64) DOCTL_ARCH="linux-arm64" ;; \
      *) DOCTL_ARCH="linux-amd64" ;; \
    esac && \
    tmpdir="$(mktemp -d)" && \
    DOCTL_VERSION=$(curl -s https://api.github.com/repos/digitalocean/doctl/releases/latest | jq -r .tag_name) && \
    curl -fsSL "https://github.com/digitalocean/doctl/releases/download/${DOCTL_VERSION}/doctl-${DOCTL_VERSION#v}-${DOCTL_ARCH}.tar.gz" \
      | tar -xz -C "$tmpdir" && \
    install -m 0755 "$tmpdir/doctl" /usr/local/bin/doctl && \
    rm -rf "$tmpdir"

RUN npm install -g @anthropic-ai/claude-code

RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee \
/etc/apt/sources.list.d/github-cli.list > /dev/null \
&& apt-get update \
&& apt-get install gh -y

RUN useradd -ms /bin/bash devcontainer
USER devcontainer
WORKDIR /workspaces/app