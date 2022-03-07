<?php

get_header();
 function checkIfOnWishList($productId){
    global $wpdb;
	$table = $wpdb->prefix . 'woocommerce_mywhishlist';
    $result =  $wpdb->get_results($wpdb->prepare("SELECT product_id FROM {$table} WHERE product_id = %s", $productId));
    if(!empty($result)){
        return true;
    }
    return false;
 }
$args = array(
    'post_type'   =>  'product',
    'stock'       =>  1,
    'posts_per_page'   =>  -1,
    'orderby'     =>  'date',
    'order'       =>  'DESC',
    
    );
 
    $products = get_posts($args);
    
    $productsWithImg = [];
    
    foreach($products as $product){

        $terms= [];
        $id = $product->ID;
        $termsArrayObj = wp_get_post_terms($id, 'product_cat');
        if(!empty($termsArrayObj)){
            foreach($termsArrayObj as $term){
                $terms[]=$term->name;
            }
        }

        $productWc = wc_get_product( $id );

        
        
        $price = $productWc->get_regular_price();
        $trim = $productWc->get_attribute('trim');
        $sku = $productWc->get_sku();
        
        $location = $productWc->get_attribute('location');
        $fuelType = $productWc->get_attribute('fuel-type');
        $make = $productWc->get_attribute('make');
        $exteriorColor = $productWc->get_attribute('exterior-color');
       $slug = $productWc->get_slug(); 
       
       
        $product = (array)$product;
        $product["imgUrl"]= get_the_post_thumbnail_url($id);
        $product["terms"] = $terms;
        $product["trim"]=$trim;
        $product["price"]= $price;
        $product["slug"]= $slug;
        $product["wishlist"]=checkIfOnWishList($productWc->get_id());
        $product["sku"] = $sku;
        $product['location']= $location;
        $product['fuelType']= $fuelType;
        $product['make']= $make;
        $product['exteriorColor']= $exteriorColor;
        $product = (object)$product;
        $productsWithImg = [...$productsWithImg, $product];
    }
    $user =(is_user_logged_in())? wp_get_current_user(): '';
    $catArgs = ['taxonomy'=>'product_cat'];
    $categories = get_categories($catArgs);
    $allCategories = [];
    foreach($categories as $cat){
        $allCategories =[...$allCategories, $cat->name];
    }
  
    
    $data = [ "products"=> $productsWithImg,
     "isLogin"=> is_user_logged_in(),
     "user"=>(!empty($user)) ? $user->data : [],
     "categories"=>$allCategories,    
];

?>

<main id="casauto-inventory">
    <pre style="display: none;"><?php echo wp_json_encode($data ) ?></pre>
    
</main>

<?php
get_footer();
?>