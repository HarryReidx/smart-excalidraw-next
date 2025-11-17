# 更新日志 - Qwen 和 Ollama 支持

## 版本信息
- 更新日期: 2025-11-17
- 功能: 新增 Qwen 和 Ollama 模型支持

## 更新内容

### 新增功能

#### 1. Qwen（通义千问）支持
- 添加阿里云通义千问模型支持
- 默认 API 端点: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- 支持 qwen-max, qwen-plus, qwen-turbo 等模型
- 使用 OpenAI 兼容的 API 格式

#### 2. Ollama（本地模型）支持
- 添加本地 Ollama 模型支持
- 默认端点: `http://localhost:11434/v1`
- **无需 API 密钥**，适合本地部署
- 支持 llama2, mistral, codellama 等开源模型
- 使用 OpenAI 兼容的 API 格式

### 修改的文件

#### 核心逻辑文件
1. **lib/llm-client.js**
   - 更新 `callLLM()` 函数，支持 qwen 和 ollama 类型
   - 更新 `callOpenAI()` 函数，API 密钥变为可选（支持 Ollama）
   - 更新 `fetchModels()` 函数，支持新的提供商类型

2. **lib/config-manager.js**
   - 更新 `validateConfig()` 函数
   - Ollama 的 API 密钥验证改为可选
   - 支持的类型扩展为: openai, anthropic, qwen, ollama

#### UI 组件文件
3. **components/ConfigManager.jsx**
   - 提供商类型下拉列表添加 Qwen 和 Ollama 选项
   - 更新基础 URL 占位符，根据类型显示不同的默认值
   - API 密钥字段添加条件标签（Ollama 显示"可选"提示）
   - 更新表单验证逻辑

4. **components/ConfigModal.jsx**
   - 提供商类型下拉列表添加 Qwen 和 Ollama 选项
   - 更新基础 URL 占位符
   - API 密钥字段添加条件标签和提示
   - 更新 `handleLoadModels()` 和 `handleSave()` 验证逻辑

#### API 路由文件
5. **app/api/models/route.js**
   - 更新参数验证逻辑
   - Ollama 类型不再强制要求 API 密钥
   - 支持空字符串作为 API 密钥（用于 Ollama）

#### 文档文件
6. **docs/qwen-ollama-support.md** (新建)
   - 详细的功能说明文档
   - 配置示例和使用方法
   - 技术实现说明
   - 常见问题解答

7. **README.md**
   - 更新快速开始部分，添加新提供商说明
   - 更新环境变量配置示例
   - 添加新的常见问题

8. **README_EN.md**
   - 英文版同步更新
   - 添加新提供商说明和配置示例

## 技术细节

### API 兼容性
- Qwen 和 Ollama 都使用 OpenAI 兼容的 API 格式
- 复用现有的 `callOpenAI()` 函数处理请求
- 主要区别在于端点 URL 和认证方式

### 认证处理
- **OpenAI/Qwen**: 使用 `Authorization: Bearer <api_key>` 头
- **Anthropic**: 使用 `x-api-key: <api_key>` 头
- **Ollama**: 不需要认证头（本地服务）

### 表单验证
- 所有类型都需要: 配置名称、提供商类型、基础 URL、模型名称
- 仅 Ollama 类型的 API 密钥为可选
- 其他类型的 API 密钥为必填

## 使用示例

### Qwen 配置示例
```javascript
{
  name: "我的通义千问",
  type: "qwen",
  baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: "sk-xxx",
  model: "qwen-max"
}
```

### Ollama 配置示例
```javascript
{
  name: "本地 Llama2",
  type: "ollama",
  baseUrl: "http://localhost:11434/v1",
  apiKey: "", // 可以为空
  model: "llama2"
}
```

## 测试建议

### 功能测试
1. 创建 Qwen 配置并测试连接
2. 创建 Ollama 配置并测试连接（需要本地运行 Ollama）
3. 测试模型列表加载功能
4. 测试配置切换功能
5. 测试图表生成功能

### 边界测试
1. 测试 Ollama 配置不填写 API 密钥的情况
2. 测试无效的 URL 格式
3. 测试网络连接失败的情况
4. 测试模型不存在的情况

## 向后兼容性

- 现有的 OpenAI 和 Anthropic 配置完全兼容
- 旧配置会自动迁移到新的配置管理系统
- 不影响现有用户的使用

## 已知限制

1. Ollama 需要本地安装和运行服务
2. Qwen 需要阿里云账号和 API 密钥
3. 模型列表加载依赖于提供商的 API 支持

## 后续计划

- [ ] 添加更多本地模型支持
- [ ] 优化模型列表加载性能
- [ ] 添加模型参数配置（temperature, max_tokens 等）
- [ ] 支持自定义提供商端点
