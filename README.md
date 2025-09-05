# 🐍 贪吃蛇经典版 (Snake Classic)

一款基于 React + TypeScript 开发的经典贪吃蛇游戏，采用现代化技术栈，支持 PC 和移动端。

![Game Screenshot](https://via.placeholder.com/600x400/1e3c72/ffffff?text=Snake+Classic+Game)

## ✨ 特性

### 🎮 游戏功能
- ✅ **经典玩法**：方向键控制蛇移动，吃食物增长得分
- ✅ **智能碰撞检测**：撞墙或撞自身结束游戏
- ✅ **实时计分**：显示当前分数和历史最高分
- ✅ **游戏控制**：暂停/继续、重新开始功能
- ✅ **数据持久化**：LocalStorage 保存游戏数据

### 🎨 界面设计
- ✅ **复古像素风**：经典绿色蛇身 + 现代 UI 设计
- ✅ **响应式布局**：完美适配 PC 和移动设备
- ✅ **流畅动画**：Canvas 渲染，60FPS 丝滑体验
- ✅ **渐变背景**：美观的渐变色彩搭配
- ✅ **视觉反馈**：蛇头方向指示器，食物动画效果

### 🎯 交互体验
- ✅ **键盘控制**：↑↓←→ 或 WASD 控制方向
- ✅ **快捷键支持**：空格开始、ESC 暂停、R 重开
- ✅ **触屏控制**：移动端虚拟方向键
- ✅ **操作防误触**：防止反向移动和连击

## 🚀 快速开始

### 在线体验
👉 **[立即游戏](https://你的用户名.github.io/snake-classic/)**

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/你的用户名/snake-classic.git
cd snake-classic

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 🎮 游戏操作

### PC 端
- **方向控制**：↑↓←→ 方向键 或 WASD 键
- **开始游戏**：空格键
- **暂停/继续**：ESC 键
- **重新开始**：R 键

### 移动端
- **方向控制**：点击屏幕虚拟方向键
- **游戏控制**：点击对应按钮

## 🔧 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **渲染引擎**：HTML5 Canvas
- **状态管理**：React Hooks
- **数据存储**：LocalStorage
- **部署平台**：GitHub Pages

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── game/           # 游戏相关组件
│   ├── ui/             # UI 组件
│   ├── pages/          # 页面组件
│   └── Game.tsx        # 主游戏组件
├── hooks/              # React Hooks
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── data/               # 数据配置
└── App.tsx            # 应用入口
```

## 🎯 游戏规则

1. **移动控制**：使用方向键或 WASD 控制蛇的移动方向
2. **吃食物**：蛇头碰到食物时，身体增长，得分 +10
3. **游戏结束**：蛇头撞到墙壁或自身身体时游戏结束
4. **分数记录**：自动保存最高分记录
5. **暂停功能**：可随时暂停和继续游戏

## 🏆 开发特色

### 代码质量
- ✅ 全面的 TypeScript 类型定义
- ✅ 组件化和模块化设计
- ✅ 自定义 Hooks 抽象逻辑
- ✅ 现代化 React 开发模式

### 用户体验
- ✅ 响应式设计适配多端
- ✅ 流畅的动画和过渡效果
- ✅ 直观的操作反馈
- ✅ 数据持久化存储

## 📊 性能指标

- **页面加载**：< 3秒 (3G 网络)
- **游戏帧率**：稳定 30-60 FPS
- **包大小**：< 200KB (gzipped)
- **浏览器支持**：Chrome 60+, Firefox 55+, Safari 12+

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交修改：`git commit -m '添加某个特性'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 详见 [LICENSE](LICENSE) 文件。

---

**享受游戏，祝你获得高分！🎉**