// 将以1为单位的数，转为以万或亿为单位的数
export function geToWan(count) {
  if (count > 1e4) 
    return parseInt(count / 1e4) + '万';
  if (count > 1e8)
    return parseInt(count / 1e8) + '亿';
  else return count;
}
// 将时间戳格式化为 时分秒
export function getTimeS(mtime) {
  mtime = parseInt(mtime / 1000);
  let hours = parseInt(mtime / 3600);
  let minutes = parseInt(mtime / 60 % 60);
  let seconds = mtime % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return hours === 0 ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
}
// 将时间戳格式化为 时分
export function getTimeM(mtime) {
  mtime = parseInt(mtime / 1000 % (24 * 3600));
  let hours = parseInt(mtime / 3600);
  let minutes = parseInt(mtime / 60 % 60);
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes}`;
}
// 个位数补零
export function getIndex(index) {
  return index < 10 ? '0' + index : index;
}