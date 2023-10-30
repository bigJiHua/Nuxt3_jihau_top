import { ElMessageBox, ElMessage } from 'element-plus'

// 二次封装 回调 Element 提示框 结果只返回 true / false
export default function (Tips: string): Promise<boolean> {
  return new Promise((resolve) => {
    ElMessageBox.confirm(
      Tips,
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      resolve(true);
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消该操作',
      });
      resolve(false);
    });
  });
}
