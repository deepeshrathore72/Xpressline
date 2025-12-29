import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState,useEffect } from 'react';
import Medcards from './medcards';

function Medicines() {
    const [user,setUser] = useState(false)
    useEffect(() => {
        const fetch = async () => { 
          const token = localStorage.getItem("token");  
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
      const handleMed = () => {
        if (user) {
          setShow(2);
        } else {
          window.location.href = "/login";
        }
      };
  return (
    <div style={{fontFamily:"montserrat",backgroundColor:"white"}}>
        {show===1 && (<section class="pt-12 sm:pt-16">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="text-center">
                <p
                    class="max-w-4xl mx-auto mb-4 text-4xl leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                    Prescriptions Delivered with Care.
                </p>
                <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                    Fast, reliable, and convenient medicine delivery service.
                </h1>
                <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                    <a href="#"
                        class="inline-flex items-center justify-center w-full px-8 py-3 text-lg text-gray-900 hover:text-white transition-all duration-200 bg-blue-300 border-2 border-blue-300 sm:w-auto rounded-xl hover:bg-blue-500 "
                        role="button" onClick={handleMed}>Order Now</a>
                </div>
            </div>
        </div>
        <div class="bg-white">
            <div class="relative mx-auto mt-4 md:mt-8">
                <div class="lg:max-w-xl lg:mx-auto">
                    <img class="px-4 md:mpx-8 justify-center mx-auto" src="med.png" />
                </div>
            </div>
        </div>
    </section>
    )}
    {show===2 && (<><i
          className="fa fa-shopping-cart"
          style={{ fontSize: "36px", textAlign: "right", marginRight: "20px" }}
        ></i> 
    <div className='flex flex-wrap'>
      <Medcards name="BENZOYL PEROXIDE (NANZ) Gel 20gm" cp="100.00" sp="81.00" img="https://www.netmeds.com/images/product-v1/600x600/1065695/benzoyl_peroxide_nanz_gel_20gm_546208_0_1.jpg" />
      <Medcards name="Volini Pain Relief Spray 15 gm " cp="70.00" sp="54.60" img="https://www.netmeds.com/images/product-v1/600x600/1060419/volini_pain_relief_spray_15_gm_with_free_volini_pain_relief_gel_4_gm_466329_0_0.jpg" />
      <Medcards name="Q Mol 650Mg Tablet" cp="20" sp="19.70" img="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSzGf3296uw1rdJAFRrXqv9HGTaKF402eMZibLntpGFq-bI7IqWY9r5c9NtoU7bwWQ4WLWNyIa1vMCdmUmXQDVfnEft8nPU" />
      <Medcards name="Hansaplast Regular Strips 100's" cp="240.00" sp="213.60" img="https://www.netmeds.com/images/product-v1/600x600/901530/hansaplast_regular_strips_100s_0_0.jpg" />
      <Medcards name="Cofsils Lozenges - Ginger Lemon 10's" cp="33" sp="25.41" img="https://www.netmeds.com/images/product-v1/600x600/409486/cofsils_lozenges_ginger_lemon_10s_0_1.jpg" />
      <Medcards name="Digene Acidity & Gas Relief Tablets - Mint Flavour 15's" cp="24.14" sp="20.52" img="https://www.netmeds.com/images/product-v1/600x600/896035/digene_acidity_gas_relief_tablets_mint_flavour_15s_85679_0_3.jpg" />
      <Medcards name="Dabur Pudin Hara Pearls Capsule 10's" cp="30" sp="28.5" img="https://www.netmeds.com/images/product-v1/600x600/15917/dabur_pudin_hara_pearls_capsule_10_s_0.jpg" />
      <Medcards name="Vicks Vaporub 50 ml" cp="170" sp="161.50" img="https://netmeds.com/images/product-v1/600x600/14021/vicks_vaporub_50_ml_32625_0_1.jpg" />
      <Medcards name="Dettol Antiseptic Liquid 60 ml" cp="38" sp="36.49" img="https://www.netmeds.com/images/product-v1/600x600/15114/dettol_antiseptic_liquid_60_ml_0_2.jpg" />
      <Medcards name="Boroline Antiseptic Ayurvedic Cream 20 gm" cp="42" sp="39.48" img="https://www.netmeds.com/images/product-v1/600x600/853511/boroline_antiseptic_ayurvedic_cream_20_gm_0_0.jpg" />
      <Medcards name="Truuth Sterilized Cotton Balls 30's" cp="45" sp="33.75" img="https://www.netmeds.com/images/product-v1/600x600/1027676/truuth_sterilized_cotton_balls_30s_472649_0_2.jpg" />
      <Medcards name="Vicks Inhaler 0.5 ml" cp="67" sp="63.5" img="https://www.netmeds.com/images/product-v1/600x600/14998/vicks_inhaler_0_5_ml_0.jpg" />
      <Medcards name="Mamaearth Tea Tree Face Wash - Tea Tree & Neem 100 ml" cp="259.00" sp="246.05 " img="https://www.netmeds.com/images/product-v1/600x600/859562/mamaearth_tea_tree_natural_face_wash_100_ml_0.jpg" />
      <Medcards name="Mamaearth Tea Tree Anti Dandruff Hair Mask 200 gm" cp="599" sp="569.05" img="https://www.netmeds.com/images/product-v1/600x600/1005531/mamaearth_tea_tree_anti_dandruff_hair_mask_200_gm_0_0.jpg" />
      <Medcards name="Cetaphil Oily Skin Cleanser 125ml" cp="596" sp="494.68" img="https://www.netmeds.com/images/product-v1/600x600/828337/cetaphil_oily_skin_cleanser_125ml_120194_0_1.jpg" />
      <Medcards name="Dettol Handwash Combo Pack (Sensitive 200 ml + Skincare Refill 175 ml)" cp="99" sp="99" img="https://www.netmeds.com/images/product-v1/600x600/968388/dettol_handwash_combo_pack_sensitive_200_ml_skincare_refill_175_ml_0_0.jpg" />
      </div></>)}
    </div>
  )
}

export default Medicines