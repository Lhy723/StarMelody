import repositories from "./repositories.json";

export const github = "https://github.com/Lhy723";
export { repositories };

const featured = [
  { name: "MelodyHub", summary: "在本地统一接入与转发 LLM 请求。", category: "模型工具" },
  { name: "Yumerin", summary: "用 Kotlin Multiplatform 做的本地优先 AI 陪伴应用。", category: "Android" },
  { name: "MMCL", summary: "用 Swift 构建的 macOS 原生 Minecraft 启动器。", category: "macOS" },
];

export const featuredProjects = featured.map((project) => ({
  ...repositories.find(({ name }) => name === project.name),
  ...project,
}));
