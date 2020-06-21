/**
 * 获取当前地理位置 先获取wgs84的位置信息,然后转换成gcj02
 * fun1 成功返回方法 fun2失败返回方法
 */
export function getPosition(fun1, fun2) {
  let plus = window.$plus;
  if (plus) {
    plus.geolocation.getCurrentPosition(
      ptData => {
        let gps = [ptData.coords.longitude, ptData.coords.latitude];//获取gps定位
        //gps坐标转换高德坐标
        AMap.convertFrom(gps, 'gps', (status, result) => {
          if (result.info === 'ok') {
            let { lng, lat } = result.locations[0];
            //获取地理位置
            getAddress(result.locations[0], (address) => {
              let pts = {
                lng: lng,
                lat: lat,
                address: address
              }
              fun1(pts);
            })
          } else {
            console.log('坐标转换失败');
          }
        });
      },
      () => {
        console.log('未获取到您的地理位置');
        if (fun2) {
          fun2();
        }
        fun1(false)
      },
      {
        provider: 'system',//获取到wgs84的位置信息
        enableHighAccuracy: true, //是否高精确度获取位置信息
        timeout: 60 * 1000, //获取位置信息的超时时间
        coordsType: 'wgs84', //坐标系类型
        geocode: true //是否解析地址信息
      },
    );
  } else {
    fun1(false)
  }
};

// 隐藏手机号中间四位
export function getHideTel(phoneNum) {
  let str = String(phoneNum),
    strLen = str.slice(-8, -4);
  return str.replace(strLen, "****");
}