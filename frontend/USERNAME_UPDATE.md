# 用户名显示功能更新

## 问题描述
之前Focus页面和其他页面的头像显示不一致，Focus页面显示"UA"而不是正确的用户名缩写。

## 解决方案

### 1. 后端API更新
- 在 `backend/routes/users.js` 中添加了 `/api/users/profile` 端点
- 该端点返回当前登录用户的用户名和邮箱信息
- 使用JWT token进行身份验证

### 2. 前端API更新
- 在 `frontend/src/api/taskApi.ts` 中添加了 `getUserProfile()` 函数
- 该函数调用后端API获取用户信息

### 3. 页面更新
更新了以下页面以使用真实的用户名：

#### FocusPage
- 从数据库获取用户名
- 显示正确的用户名缩写

#### MainPage
- 从硬编码的 "James Admin" 改为从数据库获取
- 动态显示用户真实姓名

#### DailyMemoPage
- 从硬编码的 "James Admin" 改为从数据库获取
- 动态显示用户真实姓名

#### SettingPage
- 从硬编码的 "User" 改为从数据库获取
- 同时预填充用户名和邮箱字段

#### FriendPage
- 从硬编码的 "User" 改为从数据库获取
- 动态显示用户真实姓名

#### ChartPage
- 从硬编码的 "User" 改为从数据库获取
- 动态显示用户真实姓名

### 4. 头像显示逻辑
NavBar组件中的 `getInitials()` 函数：
- 提取用户名中的前两个英文字母
- 转换为大写显示
- 如果没有英文字母则显示 "U"

## 技术实现

### 后端API
```javascript
// GET /api/users/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('username email');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
```

### 前端API
```typescript
export async function getUserProfile(): Promise<{ username: string; email: string }> {
  const res = await axios.get(`${API_BASE}/users/profile`, { headers: getAuthHeader() });
  return (res.data as { user: { username: string; email: string } }).user;
}
```

### 页面使用示例
```typescript
const [userName, setUserName] = useState<string>('User');

useEffect(() => {
  const loadUserProfile = async () => {
    try {
      const user = await getUserProfile();
      setUserName(user.username);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };
  
  loadUserProfile();
}, []);
```

## 效果
- 所有页面的头像现在都显示正确的用户名缩写
- 用户名从数据库动态获取，不再硬编码
- 统一的用户体验
- 支持多用户系统

## 注意事项
- 需要确保用户已登录且有有效的JWT token
- 如果API调用失败，会显示默认的 "User" 用户名
- 用户名缩写只取前两个英文字母，忽略数字和特殊字符 