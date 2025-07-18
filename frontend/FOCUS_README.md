# Focus Timer 功能说明

## 功能概述
Focus Timer 是一个专注时间管理工具，帮助用户提高工作效率和专注力。

## 主要功能

### 1. 时间选择
- 用户可以选择专注时间：30分钟、60分钟、90分钟、120分钟、150分钟、180分钟
- 时间范围：30分钟到3小时

### 2. 计时器控制
- **开始**：开始专注计时
- **暂停**：暂停当前专注会话
- **恢复**：从暂停状态恢复专注
- **终止**：终止当前专注会话（不保存进度）

### 3. 奖章系统
- **铜牌**：完成30分钟专注
- **银牌**：完成60分钟专注
- **金牌**：完成120分钟专注
- **白金**：完成180分钟专注

### 4. 统计信息
- 总专注会话数
- 完成的会话数
- 总专注时间（分钟）

### 5. 进度显示
- 实时进度条显示
- 倒计时显示
- 状态指示器

## 技术实现

### 后端
- **模型**：`Focus.js` - 存储专注会话数据
- **路由**：`focus.js` - 处理所有Focus相关API
- **中间件**：`auth.js` - 用户认证

### 前端
- **页面**：`FocusPage.tsx` - 主要UI组件
- **样式**：`FocusPage.styles.ts` - 样式定义
- **API**：`focusApi.ts` - 前端API接口

### API端点
- `GET /api/focus/status` - 获取当前状态
- `POST /api/focus/start` - 开始专注
- `POST /api/focus/pause` - 暂停专注
- `POST /api/focus/resume` - 恢复专注
- `POST /api/focus/terminate` - 终止专注
- `POST /api/focus/complete` - 完成专注
- `GET /api/focus/medals` - 获取奖章历史
- `GET /api/focus/history` - 获取专注历史

## 使用流程

1. **选择时间**：在页面上选择想要的专注时长
2. **开始专注**：点击"Start Focus"按钮
3. **专注过程**：计时器开始倒计时，显示进度
4. **控制操作**：
   - 可以暂停/恢复专注
   - 可以终止专注（不保存进度）
   - 时间到自动完成
5. **获得奖励**：完成专注后获得相应奖章

## 数据存储

### Focus模型字段
- `userId`：用户ID
- `duration`：设定时长（分钟）
- `startTime`：开始时间
- `endTime`：结束时间
- `status`：状态（idle/running/paused/completed/terminated）
- `totalFocusTime`：实际专注时间
- `medals`：获得的奖章数组
- `createdAt`：创建时间
- `updatedAt`：更新时间

## 部署说明

1. 确保后端已部署并包含Focus相关路由
2. 前端构建后会自动包含Focus页面
3. 访问 `/focus` 路径即可使用功能

## 注意事项

- 专注会话是用户特定的，每个用户只能有一个活跃会话
- 暂停的会话会保存进度，可以稍后恢复
- 终止的会话不会保存进度
- 奖章系统基于实际完成的专注时间
- 所有数据都会保存到用户数据库中 