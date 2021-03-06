'use strict';
// app/middleware/cookie.js

// 生成随机字符串
const randomString = function() {
  // 默认位数为64位
  const len = 64;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
module.exports = () => async function(ctx, next) {
  console.log('进入');
  let feedCookie = ctx.cookies.get('feedCookie');
  if (!feedCookie) {
    feedCookie = randomString();
    ctx.cookies.set('feedCookie', feedCookie, { maxAge: 1000 * 60 * 60 * 24 * 30 });
  }
  ctx.feedCookie = feedCookie;
  ctx.user = await ctx.model.User.findOne({ feedCookie });
  if (!ctx.user) {
    ctx.user = {};
  }
  await next();
};
