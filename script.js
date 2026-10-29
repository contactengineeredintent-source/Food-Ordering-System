let menuArr = [];
let menuSection = document.querySelector("#menu_section");
// console.log("Screen width:", screen.width);

const menuToggle = document.querySelector("#menu_toggle");
const menuIcon = menuToggle.querySelector("aside_toggle");
const aside = document.querySelector("aside");
const asidetogglebtn = document.querySelector("#aside_toggle_btn");
menuToggle.addEventListener("click", () => {
  aside.classList.toggle("active");
  asidetogglebtn.classList.remove("d-none");
});

asidetogglebtn.addEventListener("click", () => {
  aside.classList.toggle("active");
  asidetogglebtn.classList.add("d-none");
});
//order array functionality
function generateRandomOrder(menuArr) {
  let randomIndices = new Set();
  while (randomIndices.size < 3) {
    let randomIndex = Math.floor(Math.random() * menuArr.length);
    randomIndices.add(randomIndex);
  }
  let orderIndexes = [...randomIndices];
  let orderOneObj = {};
  let orderTwoObj = {};
  let orderThreeObj = {};
  orderOneObj.name = menuArr[orderIndexes[0]].name;
  orderOneObj.price = menuArr[orderIndexes[0]].price;
  orderTwoObj.name = menuArr[orderIndexes[1]].name;
  orderTwoObj.price = menuArr[orderIndexes[1]].price;
  orderThreeObj.name = menuArr[orderIndexes[2]].name;
  orderThreeObj.price = menuArr[orderIndexes[2]].price;
  let orderArr = [orderOneObj, orderTwoObj, orderThreeObj];
  return orderArr;
}
//order prepration status functionality
function getOrder() {
  let orderStatusObj = {
    order_status: true,
    paid: false,
  };
  return orderStatusObj;
}
//payment status functionality
function getPaymentStatus() {
  let paymentStatusObj = {
    order_status: true,
    paid: true,
  };
  return paymentStatusObj;
}

function generateOrder(menuArr) {
  //promises mimicking restro functionalities
  const takeOrder = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let orderArr = generateRandomOrder(menuArr);
        resolve(orderArr);
      }, 2500);
    });
  };
  const orderPrepration = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let orderStatusObj = getOrder();
        resolve(orderStatusObj);
      }, 2500);
    });
  };
  const payOrder = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let paymentStatusObj = getPaymentStatus();
        resolve(paymentStatusObj);
      }, 1000);
    });
  };
  function thankyouFnc() {
    alert("thankyou for eating with us today!");
  }

  //Promise Ececution
  takeOrder()
    .then((data) => {
      console.log("Your Order:", data);
      return orderPrepration();
    })
    .then((data) => {
      console.log("Order Prepration Status: ", data);
      return payOrder();
    })
    .then((data) => {
      console.log("Payment Status: ", data);
      thankyouFnc();
    })
    .catch((error) => {
      console.log("error encountered", error);
    });
}

async function getData() {
  try {
    const data = await fetch("./data.json");
    if (!data.ok) {
      throw new Error("API call failed");
    }
    const response = await data.json();
    menuArr = response;
  } catch (error) {
    console.log("error occured", error);
  }
}

async function initializeMenu() {
  await getData();
  menuArr.forEach((elementObj) => {
    getMenu(elementObj);
  });
  generateOrder(menuArr);
}

initializeMenu();

function getMenu(elementObj) {
  menuSection.insertAdjacentHTML(
    "beforeend",
    `
      <div class="menu_containers p-2 rounded-3">
        <img
          src="${elementObj.imgSrc}"
          alt="${elementObj.name}"
          class="rounded-3"
          style="width: 100%; height: 250px; object-fit: cover;"
        >

        <div class="d-flex align-items-center justify-content-between">
          <div class="mt-3">
            <p class="fs-4 fw-bold">${elementObj.name}</p>
            <p class="fs-4">$${elementObj.price}/-</p>
          </div>

          <div>
            <button class="btn btn-secondary fs-4 fw-bold">+</button>
          </div>
        </div>
      </div>
    `,
  );
}
