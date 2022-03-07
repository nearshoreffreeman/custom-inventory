<?php


namespace CasautoCustomInventory;

use WP_Error;
use WP_REST_Response;

class EndPoint{
    
    
    function __construct()
    {
        add_action('rest_api_init', array($this, 'addToWishlistRoute'));
        add_action('rest_api_init', array($this, 'removeToWishListRoute'));
        add_action('rest_api_init', array($this, 'getProductTermsRoute'));
        add_action('rest_api_init', array($this, 'getProductCatRoute'));
    }

    public function addToWishlistRoute(){
		register_rest_route('wishlist/v1','/add',array(
			'methods'=> 'POST',
			 'callback'=> array($this,'addToWishlist'),
            //  'permission_callback' => array($this, 'permissionsCallBack')
		));
	}
    public function removeToWishListRoute(){
		register_rest_route('wishlist/v1','/remove',array(
			'methods'=> 'POST',
			 'callback'=> array($this,'removeToWishList'),
            //  'permission_callback' => array($this, 'permissionsCallBack')
		));
	}
    public function getProductTermsRoute(){
		register_rest_route('terms/v1','/get',array(
			'methods'=> 'GET',
			 'callback'=> array($this,'getTermsByAtt'),
            //  'permission_callback' => array($this, 'permissionsCallBack')
		));
	}
    public function getProductCatRoute(){
		register_rest_route('cat/v1','/get',array(
			'methods'=> 'GET',
			 'callback'=> array($this,'getCatByAtt'),
            //  'permission_callback' => array($this, 'permissionsCallBack')
		));
	}
    function permissionsCallBack() {
        // Restrict endpoint to only users who have the edit_posts capability.
        if ( ! current_user_can( 'read' )) {
            return new WP_Error( 'rest_forbidden', esc_html__( 'OMG you can not view private data.', 'my-text-domain' ), array( 'status' => 401 ) );
        }
     
        // This is a black-listing approach. You could alternatively do this via white-listing, by returning false here and changing the permissions check.
        return true;
    }

    function addToWishlist($request){
       
        $data = $request->get_params();
      
      $idWishlist =  mywishlist_insert_product($data);
      if(!$idWishlist){
          $response = ["ok"=>false,
                       "msg"=>"error inserting"     
                    ];
            $res = new WP_REST_Response($response);
            $res->set_status(500);
            return $res;
      }
      $response = ["ok"=>true,
                    "id"=>$idWishlist,
                       "msg"=>"Success"     
                    ];
            $res = new WP_REST_Response($response);
            $res->set_status(200);
            return $res;
      

    }
    function removeToWishList($request){
        $data = $request->get_params();
      
        $idWishlist =  mywishlist_remove_product($data);
        if(!$idWishlist){
            $response = ["ok"=>false,
                         "msg"=>"error inserting"     
                      ];
              $res = new WP_REST_Response($response);
              $res->set_status(500);
              return $res;
        }
        $response = ["ok"=>true,
                      "id"=>$idWishlist,
                         "msg"=>"Success"     
                      ];
              $res = new WP_REST_Response($response);
              $res->set_status(200);
              return $res;
    }

    function getTermsByAtt($request){
      
        $taxonomy = $request->get_param('term');
       if(empty($taxonomy)){
        $response = ["ok"=>false,
           "msg"=>"The param is mandatory"     
        ];
        $res = new WP_REST_Response($response);
        $res->set_status(404);
        return $res;
       }

       $terms = get_terms([
        'taxonomy' =>"pa_".$taxonomy,
        'hide_empty' => false,
        ]);
        if(empty($terms)){
            $terms = get_terms([
                'taxonomy' =>$taxonomy,
                'hide_empty' => false,
                ]);
        }
       $termsArray = [];
       $allProducts = $this->getAllProducts();

       foreach($terms as $term){
        $filteredProd = $this->filterToAtt($allProducts, $taxonomy, $term->name);
        $termsArray[$term->name] = count($filteredProd);
            // $termsArray = [...$termsArray, $term->name];
       }
       

              $response = ["ok"=>true,
                      "terms"=>$termsArray,
                         "msg"=>"Success"     
                      ];
              $res = new WP_REST_Response($response);
              $res->set_status(200);
              return $res;
       
    }
    function getCatByAtt($request){
      
      
       $catArgs = ['taxonomy'=>'product_cat', 'hide_empty' => false,];
       $categories = get_categories($catArgs);
      
       $catsArray = [];
     //  $allProducts = $this->getAllProducts();

       foreach($categories as $cat){
          
           $filteredProd = $this->getProductsByCat($cat);
          
        // $filteredProd = $this->filterToAtt($allProducts, $taxonomy, $cat->name);
        $catsArray[$cat->name] = count($filteredProd);
        //   $catsArray = [...$catsArray, $cat->name];
       }
       var_dump($catsArray); exit;

              $response = ["ok"=>true,
                      "terms"=>$catsArray,
                         "msg"=>"Success"     
                      ];
              $res = new WP_REST_Response($response);
              $res->set_status(200);
              return $res;
       
    }
    private function getAllProducts(){
                $args = array(


			'status'               => 'publish',
			'visibility'           => 'visible',
			'limit'                => 9999,			
		);
        $products = wc_get_products($args);
        return $products;
     }
     private function filterToAtt($productsSearchAtt, $att, $value){


        $productFiltered = [];
		foreach($productsSearchAtt as $product){
			 
			 $attribute = $product->get_attribute($att);
			
			$attribute = strtolower($attribute);
			$valueToSearch = strtolower($value);
			
			 if(str_contains($attribute, $valueToSearch )){
				
				$productFiltered = [...$productFiltered, $product->get_id()];
			 }
			
		}
        return $productFiltered;
     }
     private function getProductsByCat($cat){
        $args = array(


			'status'               => 'publish',
			'post_type'=>'product',
            'category_name'=>$cat->name		
		);
        $products = get_posts($args);
        return $products;
     }
}
