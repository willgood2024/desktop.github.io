/**
 * 培训考试答题系统 - 全局配置
 * 修改此文件即可调整考试参数，无需改动主程序
 */
window.EXAM_CONFIG = {
  // ===== 题库与抽题 =====
  // 题库题数无上限，实际题数由 questions.js 或导入的题库自动决定（管理页可查看）
  pickCount: 10,                // 每次随机抽取题目数（超过题库总数时自动取全部）
  requiredMin: 1,               // 每次抽题至少抽中的"必答题"数量（0 = 不启用必答机制）

  // ===== 分值设置 =====
  defaultScore: {
    single: 10,                 // 单选题默认分值
    multiple: 10,               // 多选题默认分值
    judge: 10                   // 判断题默认分值
  },
  passScore: 60,                // 及格线（满分100）

  // ===== 倒计时 =====
  countdownEnabled: true,       // 是否启用倒计时
  countdownSeconds: 900,        // 倒计时总时长（秒），900 = 15分钟
  autoSubmitOnTimeout: true,    // 倒计时结束时是否自动提交

  // ===== 二维码 =====
  // 部署到服务器后，填写实际访问地址（如 "http://192.168.1.100:8080" 或 "https://xxx.github.io/exam"）
  // 留空则自动使用当前页面 URL
  baseUrl: '',

  // ===== 数据存储 =====
  storageKey: 'exam_records',  // localStorage 存储键名

  // ===== 管理入口 =====
  adminPin: ''                  // 管理页 PIN 码，留空则无需密码
};
