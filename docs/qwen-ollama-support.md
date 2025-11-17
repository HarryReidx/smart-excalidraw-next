# Qwen 和 Ollama 模型支持

## 概述

配置管理功能现已支持 Qwen（通义千问）和本地 Ollama 模型，除了原有的 OpenAI 和 Anthropic 支持。

## 新增功能

### 1. Qwen（通义千问）支持

Qwen 是阿里云推出的大语言模型服务。

**配置示例：**
- **提供商类型**: Qwen (通义千问)
- **基础 URL**: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- **API 密钥**: 您的阿里云 API Key
- **模型**: `qwen-max`, `qwen-plus`, `qwen-turbo` 等

### 2. Ollama（本地模型）支持

Ollama 允许您在本地运行开源大语言模型，无需 API 密钥。

**配置示例：**
- **提供商类型**: Ollama (本地)
- **基础 URL**: `http://localhost:11434/v1`
- **API 密钥**: 无需填写（本地模型不需要密钥）
- **模型**: `llama2`, `mistral`, `codellama` 等

**注意事项：**
- 使用 Ollama 前需要先在本地安装并运行 Ollama 服务
- 确保 Ollama 服务正在运行（默认端口 11434）
- 可以通过 `ollama list` 命令查看已安装的模型

## 使用方法

### 创建新配置

1. 打开配置管理界面
2. 点击"新建配置"按钮
3. 选择提供商类型（OpenAI / Anthropic / Qwen / Ollama）
4. 填写相应的配置信息：
   - 配置名称（必填）
   - 基础 URL（必填）
   - API 密钥（Ollama 可选，其他必填）
   - 模型名称（必填）
5. 点击"加载可用模型"按钮获取模型列表（可选）
6. 保存配置

### 切换配置

在配置列表中，点击任意配置的"设为当前"按钮即可切换到该配置。

### 测试连接

每个配置都可以通过"测试"按钮验证连接是否正常。

## 技术实现

### 更新的文件

1. **lib/llm-client.js**
   - 更新 `callLLM` 函数支持 Qwen 和 Ollama
   - 更新 `callOpenAI` 函数处理可选的 API 密钥
   - 更新 `fetchModels` 函数支持新的提供商类型

2. **lib/config-manager.js**
   - 更新 `validateConfig` 函数，Ollama 的 API 密钥为可选

3. **components/ConfigManager.jsx**
   - 添加 Qwen 和 Ollama 选项到提供商类型下拉列表
   - 更新表单验证逻辑
   - 为 Ollama 添加友好的提示信息

4. **components/ConfigModal.jsx**
   - 添加 Qwen 和 Ollama 选项
   - 更新 API 密钥字段标签和验证

5. **app/api/models/route.js**
   - 更新参数验证，Ollama 不需要 API 密钥

## API 兼容性

Qwen 和 Ollama 都使用 OpenAI 兼容的 API 格式，因此可以复用现有的 OpenAI 客户端代码。主要区别：

- **Qwen**: 需要 API 密钥，使用阿里云的端点
- **Ollama**: 不需要 API 密钥，使用本地端点

## 常见问题

### Q: Ollama 连接失败怎么办？

A: 请确保：
1. Ollama 服务已安装并正在运行
2. 基础 URL 正确（默认为 `http://localhost:11434/v1`）
3. 已经下载了至少一个模型（使用 `ollama pull <model-name>`）

### Q: Qwen 如何获取 API 密钥？

A: 访问阿里云控制台，在 DashScope 服务中创建 API 密钥。

### Q: 可以同时配置多个提供商吗？

A: 可以！配置管理支持创建多个配置，可以随时切换使用不同的提供商和模型。
