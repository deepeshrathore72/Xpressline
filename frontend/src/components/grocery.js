import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import GroceryCard from './grocerycard';
import {useSelector} from 'react-redux'
import Basket from './basket';
// import * as actionCreators from '../states/action-creators/index';

function Grocery() {
  const [user, setUser] = useState(false)
  const email = localStorage.getItem('email')
  // const email = useSelector((state) => state.reducer.email);
  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      console.log(email)
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded) {
          setUser(true);
        }
      }
    }
    fetch();
  }, []);
  const [show, setShow] = useState(1);
  const handleGrocery = () => {
    if (user) {
      setShow(2);
    } else {
      window.location.href = "/login";
    }
  };
    const item = useSelector((state) => state.reducer.item);
  const basket = () => {
    if (user) {
      setShow(3);
    }
    else {
      window.location.href = "/login";
    }
  }
  // const dispatch = useDispatch();
  return (
    <div style={{ fontFamily: "montserrat" }}>
      {show === 1 && (<section class="pt-12  sm:pt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="text-center">
            <p
              class="max-w-4xl mx-auto mb-4 text-4xl leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
              Bringing Freshness to Your Doorstep
            </p>
            <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
              Discover the ultimate convenience of grocery shopping with our reliable grocery delivery service.
            </h1>
            <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <a href="#"
                class="inline-flex items-center justify-center w-full px-8 py-3 text-lg text-gray-900 hover:text-white transition-all duration-200 bg-blue-300 border-2 border-blue-300 sm:w-auto rounded-xl hover:bg-blue-500 "
                role="button" onClick={handleGrocery}>Order Now</a>
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="relative mx-auto mt-4 md:mt-8">
            <div class="lg:max-w-xl lg:mx-auto">
              <img class="px-4 md:mpx-8 justify-center mx-auto mt-2 mb-5" src="Grocery.png" />
            </div>
          </div>
        </div>
      </section>)}
      {
        show === 2 && (<> <div style={{ textAlign: "right", marginRight: "60px" }}>
          

          <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-100 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={basket}>
          <i className="fa fa-shopping-cart" style={{ fontSize: "40px" }}></i>
            {/* <span class="sr-only">Notifications</span> */}
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{item}</div>
          </button>

        </div>

          < div className='flex flex-wrap'>
            <GroceryCard img={"https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg"} name={"Brocolli"} sp={"49"} cp={"69"} />
            <GroceryCard img={"https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41s8sFYXt1L._SX300_SY300_QL70_FMwebp_.jpg"} name={"Bournvita"} sp={"228"} cp={"250"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/126906_8-aashirvaad-atta-whole-wheat.jpg?tr=w-640,q=80"} name={"Aashirvad Aata"} sp={"429"} cp={"520"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/1202881_6-hersheys-milk-shake-chocolate.jpg?tr=w-640,q=80"} name={"Hersheys Chocolate Flavor Milkshake"} sp={"105"} cp={"120"} />
            <GroceryCard img={"https://5.imimg.com/data5/PR/MR/GY/SELLER-5113762/yellow-cheddar-cheese-500x500.jpg"} name={"Cheddar Cheese (200g Block)"} sp={129} cp={159} />
            <GroceryCard img={"https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/31J2VNcw51L.jpg"} name={"Eggs (12-Pack)"} sp={39} cp={45} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40224091-2_1-fresho-cherry-tomatoes-hydroponically-grown.jpg?tr=w-640,q=80"} name={"Cherry Tomatoes (250g Pack)"} sp={49} cp={59} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40014630_5-borges-whole-wheat-pasta-penne-rigate.jpg?tr=w-640,q=80"} name={"Whole Wheat Pasta (500g)"} sp={"55"} cp={"65"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40006247_3-borges-olive-oil-extra-virgin.jpg?tr=w-640,q=80"} name={"Olive Oil (500ml)"} sp={"249"} cp={"279"} />
            <GroceryCard img={"https://myonlyearth.com/cdn/shop/products/Image-02_91b745f3-ee63-430b-a9b9-ed612575ef3f.png?v=1677746026&width=600"} name={"Oat Milk (1L)"} sp={"69"} cp={"79"} />
            <GroceryCard img={"https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71XiAdT4u7L._SX679_.jpg"} name={"Coffee Beans (250g)"} sp={"129"} cp={"149"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40072466_14-bb-royal-organic-brown-rice.jpg?tr=w-640,q=80"} name={"Brown Rice (1kg)"} sp={"79"} cp={"89"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40128137_4-delishh-frozen-mix-berries.jpg?tr=w-640,q=80"} name={"Frozen Mixed Berries (500g)"} sp={"99"} cp={"119"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40116022_1-fresho-apple-red-delicious-economy-institutional.jpg?tr=w-640,q=80"} name={"Apples (5 Pack)"} sp={"45"} cp={"55"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/240122_23-dabur-100-pure-honey-worlds-no1-honey-brand-with-no-sugar-adulteration.jpg?tr=w-640,q=80"} name={"Honey (500ml)"} sp={"149"} cp={"169"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40092231_10-bb-royal-organic-almondbadam.jpg?tr=w-640,q=80"} name={"Almonds (200g)"} sp={"127"} cp={"149"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/40281258_1-milky-mist-greek-yogurt-natural-high-protein-no-added-sugar.jpg?tr=w-640,q=80"} name={"Greek Yogurt (500g)"} sp={"65"} cp={"85"} />
            <GroceryCard img={"https://images-cdn.ubuy.co.in/64bf213a6ce060146c3aaeca-great-value-finely-shredded-parmesan.jpg"} name={"Parmesan Cheese (100g)"} sp={"45"} cp={"55"} />
            <GroceryCard img={"https://5.imimg.com/data5/PW/ND/MY-46595757/fresh-pineapple-281kg-29-500x500.png"} name={"Pineapple (Whole)"} sp={"75"} cp={"89"} />
            <GroceryCard img={"https://www.bigbasket.com/media/uploads/p/l/10000148_32-fresho-onion.jpg?tr=w-640,q=80"} name={"Red Onion (1kg Bag)"} sp={"29"} cp={"39"} />
          </div></>)
      }
      {
        show === 3 && (<Basket setShow={setShow}/>)
      }
    </div>
  )
}

export default Grocery