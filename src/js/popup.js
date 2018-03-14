import img from '../img/icons/icon.png';
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  var url = tabs[0].url;
  var qrcode = new QRCode('qrcode', {
    width: 160,
    height: 160
  });
  qrcode.clear();
  qrcode.makeCode(url);
});