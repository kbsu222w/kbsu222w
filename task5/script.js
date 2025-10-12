

function click1() {
  let f2 = document.getElementsByName("select1");
  let f1 = document.getElementsByName("field1");
  let r = document.getElementById("result");
  let num = f2[0].value
  if (isNaN(f1[0].value)) r.innerHTML = "Ошибка, введите число";
  if (num == "t1") r.innerHTML = "Стоимость заказа: "+f1[0].value * 100;
  else if (num == "t2") r.innerHTML = "Стоимость заказа: "+f1[0].value * 200;
  else if (num == "t3") r.innerHTML = "Стоимость заказа: "+f1[0].value * 300;
  
  console.log(f2[0].value);
  return false;
}

document.addEventListener("DOMContentLoaded", ready);
