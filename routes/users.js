const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const root = {
  register: async ({ email, password }) => {
    try {
      // 檢查用戶是否已經存在
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new Error('User already exists.');
      }

      // 加密密碼
      const hashedPassword = await bcrypt.hash(password, 12);

      // 創建一個新用戶
      const user = new User({
        email,
        password: hashedPassword
      });

      // 保存到數據庫
      const result = await user.save();

      // 返回結果
      return { ...result._doc, password: null, id: result._id };
    } catch (error) {
      throw error;
    }
  }
};

