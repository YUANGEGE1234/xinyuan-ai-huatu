<div align="center">

# 🎨 鑫源AI画图

[![License](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](https://github.com/YUANGEGE1234/xinyuan-ai-huatu/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**基于 OpenAI gpt-image 系列的本地 AI 画图工具（鑫源AI 专用）**

内置 [鑫源AI](https://yuangeluyou.com/) 中转站配置，开箱即用。<br>
支持文本生图、参考图、画板标注与遮罩编辑，数据纯本地化存储。

</div>

<br>

> 💡 **提示**：本项目只提供本地部署方式（Windows 桌面客户端与 Docker），不提供任何线上部署渠道。所有历史记录与图片都保存在本机，不会上传到第三方服务器。

---

## ✨ 核心特性

### 🎨 图像生成与编辑
- **参考图与遮罩**：最多 16 张参考图（支持剪贴板和拖拽），内置遮罩编辑器，自动预处理以符合官方分辨率限制。
- **画板标注**：在空白画布或参考图上用画笔、文字、图形和像素橡皮擦标注修改意图，完成后作为参考图；画板与遮罩编辑器可缩放平移。
- **评论标注**：在画板中用评论工具点击图片添加评论，以「@图N 评论」插入提示词，发送时附上评论在图中的位置。
- **批量与迭代**：支持单次多图生成；一键将满意结果转为参考图，无缝开启下一轮修改。
- **多提示词批量提交**：可一次粘贴多条提示词（以两个空行分隔），共用参考图和参数；支持排队或并发（默认上限 10）。
- **流式生成预览**：`Images API` 与 `Responses API` 模式均支持流式接收中间步骤图像，缓解连接超时问题。
- **透明背景**：选择 PNG 或 WebP 后可开启，可在 API 配置页为每个配置分别选择 API 原生或本地后处理。

### 🤖 Agent 多轮对话模式
- **多轮对话与上下文记忆**：基于 Responses API，Agent 理解上下文并按需调用图像工具；可用 `@` 引用参考图或之前生成的图片。
- **并发批量生成**：`generate_image_batch` 在一轮中并发生成多张关联图像，`continue_generation` 自动追加新一轮以处理依赖关系。
- **分支与重新生成**：编辑重发或重新生成某轮消息会产生可切换的分支。
- **可选 Web 搜索**：可开启 `web_search` 工具，Agent 会在需要时搜索网络信息并附带引用链接。

### ⚙️ 精细化参数追踪
- **智能尺寸控制**：提供 1K/2K/4K 预设，自定义宽高时自动规整到模型安全范围（16 的倍数、总像素校验等）。
- **实际参数对比**：提取 API 响应中实际生效的尺寸、质量、耗时和模型改写后的提示词，与请求参数高亮对比。

### 📁 高效历史管理（纯本地）
- **瀑布流与画廊**：历史任务自动保存，支持按状态过滤、全屏大图预览与快捷下载。
- **多收藏夹管理**：同一任务可归入多个收藏夹；支持拖拽排序、重命名、设为默认和按收藏夹打包下载 ZIP。
- **失败任务重试**：重试方式可选新建任务或覆盖原任务。
- **快捷批量操作**：桌面端支持拖拽框选、Ctrl/⌘ 连选，移动端支持侧滑多选。
- **性能与隐私**：记录和图片只保存在本地（客户端为本机数据目录），SHA-256 去重压缩，不经过第三方服务器；可打包导出 ZIP 备份。

### 🔌 多配置与供应商增强
- **多配置管理**：保存多个 API 配置（供应商、API Key、模型等）并快速切换，配置与供应商列表均可拖拽排序。
- **多模型切换**：模型 ID 可用逗号分隔填写多个，在首页切换，按配置分别记住。
- **多供应商接入**：内置 OpenAI 兼容接口（`Images API` / `Responses API`）、sub2api（异步）、fal.ai（队列），并可通过 JSON 导入自定义 HTTP 供应商。
- **Agent 模式独立 API 配置**：Agent 可使用原生或混合模式的独立配置。
- **API 代理**：OpenAI 兼容接口与 fal.ai 均可配置自定义代理；OpenAI 兼容接口还可走同源 `/api-proxy/`，由 Docker 或本地开发服务器转发，绕开浏览器 CORS 限制。
- **习惯配置**：提交后清空输入、重启后保留输入、界面字体、系统通知、自动检查更新等。

---

## 🚀 部署与使用

本项目只保留两种本地部署方式：**Windows 桌面客户端**与 **Docker**。

<a id="desktop-client"></a>
### 🖥️ 方式一：Windows 桌面客户端

客户端的数据保存在本机，不受浏览器存储配额和跨域限制影响，可直连鑫源AI 接口。

**安装**

- 在 [Releases](https://github.com/YUANGEGE1234/xinyuan-ai-huatu/releases) 中下载以 `_x64-setup.exe` 结尾的安装包。
- 安装包没有代码签名，遇到 SmartScreen 提示时点击「更多信息 → 仍要运行」。
- 安装到普通文件夹（如 `D:\Apps\鑫源AI画图`）。装到 `C:\Program Files` 等需要管理员权限写入的位置会导致无法保存数据。
- 数据默认保存在 `<安装目录>\data` 中，可在「设置 → 数据管理」中更改。

**自行构建**

需要 Rust 和 Tauri 的 Windows 构建环境，见 [Tauri 前置条件](https://v2.tauri.app/start/prerequisites/)。

```bash
npm install
npm run tauri:dev
npm run tauri:build
```

- 客户端构建读取 [`src-tauri/.env`](src-tauri/.env)，不读取根目录的 `.env`；可在 `src-tauri/.env.local` 中覆盖。
- `tauri:build` 需设置 `TAURI_SIGNING_PRIVATE_KEY`（私钥内容或路径）和 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`，用于给更新包签名；未设置时构建会失败。
- 仓库已包含一对可用的签名密钥（由 `npx tauri signer generate` 生成）：公钥写在 [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json) 的 `plugins.updater.pubkey` 中，私钥文件与密码由维护者单独保管，**不得提交到仓库**。
- 在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加 `TAURI_SIGNING_PRIVATE_KEY`（私钥内容）与 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`，推送 `v*` tag 时 `tauri-release.yml` 会构建并签名安装包、上传到 Release，客户端即可应用内更新。
- 如需更换密钥，重新运行 `npx tauri signer generate`，并同步更新 `plugins.updater.pubkey`。

<a id="docker-deployment"></a>
### 🐳 方式二：Docker 部署

使用镜像在服务器或本地容器环境中运行。镜像已内置鑫源AI 预置配置，直接运行即可，无需额外参数。

**Docker CLI**

```bash
docker run -d -p 8080:80 ghcr.io/yuangege1234/xinyuan-ai-huatu:latest
```

需要改用其他 API 地址时，通过 `DEFAULT_API_URL` 覆盖：

```bash
docker run -d -p 8080:80 \
  -e DEFAULT_API_URL=https://yuangeluyou.com/v1 \
  ghcr.io/yuangege1234/xinyuan-ai-huatu:latest
```

使用 host 网络时加 `--network host`，修改监听端口用 `-e PORT=28080`。

**Docker Compose**

```yaml
services:
  xinyuan-ai-huatu:
    image: ghcr.io/yuangege1234/xinyuan-ai-huatu:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

**挂载配置文件**

`DEFAULT_API_URL` 指向容器内路径时，宿主机上的 JSON 配置文件需通过 volume 挂载：

```bash
docker run -d -p 8080:80 \
  -v ./xinyuan-presets.json:/config/xinyuan-presets.json:ro \
  ghcr.io/yuangege1234/xinyuan-ai-huatu:latest
```

**Docker 专属变量**

| 变量 | 说明 |
|------|------|
| `ENABLE_API_PROXY=true` | 开启 Nginx 同源代理，请求发往 `/api-proxy/{路径}` 再转发到 `API_PROXY_URL` |
| `API_PROXY_URL` | 代理转发的完整 API 基础地址（不自动补 `/v1`） |
| `LOCK_API_PROXY=true` | 强制开启代理，用户无法关闭；需同时设置 `ENABLE_API_PROXY=true` |
| `HOST` / `PORT` | Nginx 监听地址和端口，默认 `0.0.0.0:80` |

> 开启 API 代理后，任何人都能将你的服务器作为代理来请求目标 API。建议仅在有访问控制（如 IP 白名单）或本地网络中开启。

### 💻 本地开发

```bash
npm install
npm run dev
```

本地开发遇到浏览器 CORS 限制时，可开启开发服务器代理：

```bash
cp dev-proxy.config.example.json dev-proxy.config.json
```

- 将 `dev-proxy.config.json` 中的 `target` 设为完整的 API 基础地址（如 `https://yuangeluyou.com/v1`）。
- 重启开发服务器，在设置中开启 **API 代理**，请求会按 `http://localhost:5173/api-proxy/... -> target/...` 转发。
- 仅在 `npm run dev` 时生效，不影响构建产物。

构建静态产物：

```bash
npm run build
```

产物位于 `dist/`。

---

## 🔑 配置鑫源AI

1. 前往 [鑫源AI](https://yuangeluyou.com/register) 注册账号并充值（最低 $1）。
2. 登录后台，进入「令牌」页面，点击「添加令牌」创建 API Key。
3. 打开本工具的「设置 → API 配置」，已内置的「鑫源AI」配置会自动填入以下内容：

   | 字段 | 值 |
   |------|------|
   | API 地址 | `https://yuangeluyou.com/v1` |
   | 模型 | `gpt-image-2`、`gpt-image-2-all`、`gpt-image-1.5`、`gpt-image-1`、`gpt-image-1-all` |

4. 把上一步创建的令牌粘贴到「API Key」中，保存后即可开始画图。

> 不同客户端可能需要不同的 BASE_URL，如 `https://yuangeluyou.com`，可在配置中自行调整。模型名称以鑫源AI 后台「支持模型」列表为准。

---

## ⚙️ 环境变量

- 构建时变量需在构建前设置。
- Docker 使用去掉 `VITE_` 前缀的同名变量，在容器启动时读取。

| 构建时变量 | Docker 变量 | 说明 |
|------|------|------|
| `VITE_DEFAULT_API_URL` | `DEFAULT_API_URL` | 预置配置，见下文 |
| `VITE_LOCK_PRESET_CONFIG_PARAMS=true` | `LOCK_PRESET_CONFIG_PARAMS=true` | 锁定预置配置中除 API Key 外的参数 |
| `VITE_PREVENT_PRESET_CONFIG_DELETION=true` | `PREVENT_PRESET_CONFIG_DELETION=true` | 禁止删除预置配置及随预置引入的自定义供应商 |
| `VITE_SHOW_PRESET_CONFIG_ONLY=true` | `SHOW_PRESET_CONFIG_ONLY=true` | 只允许使用当前预置配置 |
| `VITE_DEFAULT_UI_FONT` | `DEFAULT_UI_FONT` | 默认界面字体：`builtin`（内置，默认）、`system` 或本机字体名称 |
| `VITE_DEFAULT_MONO_FONT` | `DEFAULT_MONO_FONT` | 默认代码字体，取值规则同上 |
| `VITE_BUILTIN_FONT_SOURCE` | `BUILTIN_FONT_SOURCE` | 内置字体来源：`cdn`（默认）或 `local`（[`fonts/`](fonts) 目录中的文件） |

---

## 📋 预置配置

`VITE_DEFAULT_API_URL` 支持三种写法。

**1. API 地址**

```dotenv
VITE_DEFAULT_API_URL=https://yuangeluyou.com/v1
```

自动创建 ID 为 `default-openai` 的 OpenAI 兼容预置配置。

**2. API 地址 + 查询参数**

```dotenv
VITE_DEFAULT_API_URL=https://yuangeluyou.com/v1?model=gpt-image-2&apiMode=images
```

**3. 完整 JSON**

需要预置多个配置、自定义供应商或 Agent 时，使用 JSON。仓库内已提供 [`xinyuan-presets.json`](xinyuan-presets.json) 作为示例：

```dotenv
VITE_DEFAULT_API_URL=./xinyuan-presets.json
```

顶层字段：

- **`profiles`**（数组）：预置的 API 配置列表。
- **`customProviders`**（可选数组）：自定义供应商定义。
- **`agent`**（可选对象）：Agent 的独立 API 模式及文本、图像配置选择。

`profiles` 中每项的字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 定向更新时填写 | 配置标识 |
| `name` | 是 | 配置名称 |
| `description` | 否 | 配置说明，支持 Markdown |
| `provider` | 是 | `"openai"`、`"sb2api-async"`、`"fal"`，或 `customProviders` 中的供应商 ID |
| `baseUrl` | 是 | API 基础地址；未以 `/` 结尾时按 OpenAI 规则补齐 `/v1` |
| `apiKey` | 否 | API Key。建议省略，由用户自行填写 |
| `model` | 是 | 模型 ID，多个以逗号分隔，默认使用第一个 |
| `apiMode` | 否 | `"images"` 或 `"responses"`，默认 `"images"` |
| `isDefault` | 否 | 有多个配置时为默认项设置 `true` |
| `timeout` | 否 | 请求超时秒数，默认 600 |
| `apiProxy` | 否 | 是否走部署端 API 代理，默认 `false` |
| `transparentBackgroundMethod` | 否 | 透明背景实现方式：`"api"`（API 原生）或 `"local"`（本地后处理） |

完整示例见 [`xinyuan-presets.json`](xinyuan-presets.json)（单配置）、[`gpt-image-config.example.json`](gpt-image-config.example.json) 与 [`gpt-image-config.agent.example.json`](gpt-image-config.agent.example.json)（含 Agent 配置）。

---

## 🔌 自定义供应商

API 不是标准 OpenAI 格式时，在预置 JSON 的 `customProviders` 中定义请求和响应结构。每个供应商需有唯一的 `id`，由 `profiles` 中的 `provider` 字段引用。

获取供应商定义：

- **AI 生成**：在「设置 → API 配置 → 供应商类型 → 创建自定义供应商 → AI 一键生成与导入」中粘贴第三方 API 文档生成配置。
- **手动生成**：将 [自定义供应商 LLM 提示词](docs/custom-provider-llm-prompt.md) 和第三方 API 文档发给任意 LLM，获取完整 JSON。

---

## 🛠️ URL 传参快速填充

通过 URL 查询参数快速填入 OpenAI 兼容配置，适合创建书签或集成分享。

| 参数 | 说明 | 示例 |
|------|------|------|
| `apiUrl` | API Base URL | `?apiUrl=https://yuangeluyou.com/v1` |
| `apiKey` | API Key | `?apiKey=sk-xxxx` |
| `model` | 模型 ID，多个以逗号分隔 | `?model=gpt-image-2,gpt-image-2-all` |
| `apiMode` | `images` 或 `responses`，默认 `images` | `?apiMode=responses` |
| `profileName` | 配置名称 | `?profileName=我的配置` |
| `profileId` | 目标配置 ID；匹配到同 ID 配置时直接更新 | `?profileId=xinyuan-default` |
| `transparentBackgroundMethod` | 透明背景实现方式：`api` 或 `local` | `?transparentBackgroundMethod=local` |

在客户端中，复制带 `apiUrl` 或 `settings` 参数的导入链接后切回客户端，即会提示导入。

---

## 📢 公告卡片

[`public/announcements.json`](public/announcements.json) 定义启动时显示的公告卡片，随应用一起打包。

- **添加公告**：在数组中追加一个对象。
- **关闭公告**：把该文件改为 `[]`。

| 字段 | 说明 |
|------|------|
| `id` | 必填，唯一标识；已读记录按 id 保存 |
| `title` | 必填，标题 |
| `content` | 必填，Markdown 正文 |
| `note` | 可选，正文下方的次要说明（纯文本） |
| `when` | 可选，显示条件，缺省时总是显示 |
| `action` | 可选，主按钮 `{ "label": "...", "url": "https://..." }` |
| `media` | 可选，卡片顶部的媒体 `{ "type": "html" \| "image", "src": "...", "aspectRatio": "16/9" }` |

---

## 💻 技术栈

<div align="center">
  <br>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 3" /></a>
  <a href="https://zustand.docs.pmnd.rs/"><img src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" /></a>
  <br>
  <br>
</div>

## 🔤 字体许可

本项目内置以下两款字体，由 `VITE_BUILTIN_FONT_SOURCE` 决定从公共 CDN 加载还是使用 [`fonts/`](fonts) 目录中的字体文件。完整许可文本位于 [`third-party-licenses/`](third-party-licenses)，也可在应用的「设置 → 关于 → 字体与第三方许可」中查看。

| 字体 | 版权方 | 许可 | 项目地址 |
|------|------|------|------|
| HarmonyOS Sans SC | Huawei Device Co., Ltd. | HarmonyOS Sans Fonts License Agreement | [HarmonyOS 设计资源](https://developer.huawei.com/consumer/cn/design/resource/) |
| Maple Mono NF CN | The Maple Mono Project Authors | SIL Open Font License 1.1 | [subframe7536/maple-font](https://github.com/subframe7536/maple-font) |

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。
