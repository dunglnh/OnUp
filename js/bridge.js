/* Cầu nối giữa một bài ôn (modules/*) và app chính.
   - Khi app mở bài ôn trong khung với ?u=<mã học sinh>&m=<mã bài>, mọi khóa localStorage của bài
     được đặt tiền tố riêng theo học sinh (window.ONTAP_NS), nên nhiều con dùng chung một máy
     vẫn có tiến độ riêng.
   - Sau mỗi lần làm xong, bài ôn gọi ontapReport({...}); hàm này gửi điểm về app chính.
   Mở bài ôn trực tiếp (không có ?u=) thì bài chạy như trang độc lập, dùng khóa lưu cũ. */
(function () {
  var p;
  try { p = new URLSearchParams(location.search); } catch (e) { p = { get: function () { return null; } }; }
  var u = (p.get("u") || "").replace(/[^a-zA-Z0-9_-]/g, "");
  var m = (p.get("m") || "").replace(/[^a-zA-Z0-9_-]/g, "");
  window.ONTAP_NS = u ? "u_" + u + "__" : "";
  window.ontapReport = function (d) {
    try {
      if (window.parent && window.parent !== window) {
        var msg = { type: "ontap:result", module: m };
        for (var k in d) msg[k] = d[k];
        window.parent.postMessage(msg, location.origin === "null" ? "*" : location.origin);
      }
    } catch (e) { /* bài ôn vẫn chạy bình thường nếu không gửi được */ }
  };
})();
