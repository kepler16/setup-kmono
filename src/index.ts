import http from "@actions/http-client";
import tc from "@actions/tool-cache";
import core from "@actions/core";

const getVersion = async () => {
  const version = core.getInput("version");
  if (version && version !== "latest") {
    return version;
  }

  const client = new http.HttpClient();
  const res = await client.get(
    "https://api.github.com/repos/kepler16/kmono/releases/latest",
    {
      "user-agent": "kepler16/setup-kmono",
      accept: "application/json",
    },
  );
  const data = await res.readBody();

  return JSON.parse(data).tag_name.replace("v", "");
};

const getArch = () => {
  if (process.arch == "arm64") {
    return process.arch;
  }

  if (process.arch == "x64") {
    return "amd64";
  }

  throw new Error("Unsupported arch");
};

const getBinName = () => {
  if (process.platform === "darwin") {
    return `kmono-macos-${getArch()}.tar.gz`;
  }

  if (process.platform == "linux") {
    return `kmono-linux-${getArch()}.tar.gz`;
  }

  throw new Error("Windows not supported");
};

const version = await getVersion();

const tar_path = await tc.downloadTool(
  `https://github.com/kepler16/kmono/releases/download/v${version}/${getBinName()}`,
);

const extract_dir = await tc.extractTar(tar_path);

core.addPath(extract_dir);

core.info(`Setup kmono version ${version}`);
