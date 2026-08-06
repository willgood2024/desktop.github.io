/**
 * 培训考试答题系统 - 全局配置
 * 修改此文件即可调整考试参数，无需改动主程序
 */
window.EXAM_CONFIG = {
  // ===== 题库与抽题 =====
  totalQuestions: 16,           // 题库总数
  pickCount: 10,                // 每次随机抽取题目数

  // ===== 分值设置 =====
  defaultScore: {
    single: 10,                 // 单选题默认分值
    multiple: 10,               // 多选题默认分值
    judge: 10                   // 判断题默认分值
  },
  passScore: 80,                // 及格线（满分100）

  // ===== 倒计时 =====
  countdownEnabled: true,       // 是否启用倒计时
  countdownSeconds: 900,        // 倒计时总时长（秒），900 = 5分钟
  autoSubmitOnTimeout: true,    // 倒计时结束时是否自动提交

  // ===== 二维码 =====
  // 部署到服务器后，填写实际访问地址（https://willgood2024.github.io/desktop.github.io/
  // 留空则自动使用当前页面 URL
  baseUrl: '',

  // ===== 数据存储 =====
  storageKey: 'exam_records',  // localStorage 存储键名

  // ===== 管理入口 =====
  adminPin: ''                  // 管理页 PIN 码，留空则无需密码
};
