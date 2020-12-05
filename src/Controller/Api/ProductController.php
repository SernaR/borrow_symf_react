<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api", name="products")
 */
class ProductController extends AbstractController
{
     /**
     * @Route("/products", name="_index", methods="GET")
     */
    public function index(ProductRepository $repo) 
    {
        $products = $repo->findBy(['isAvailable' => true], ['createdAt' => 'DESC']);
        return $this->json( $products, 200, [], ['groups' => "products"]);
    }

    /**
     * @Route("/products/{product<[0-9]+>}", name="_find", methods="GET")
     */
    public function find(Product $product) { 
        return $this->json( $product, 200, [], ['groups' => "products"]);
    }

    /**
     * @Route("/products/{user}", name="_store", methods="POST")
     */
    public function store(Request $request, EntityManagerInterface $em, User $user, ValidatorInterface $validator)
    {
        $uploadedFile = $request->files->get('imageFile');
        $body = $request->request; 

        $product = new Product();
        $product->setName($body->get('name'));
        $product->setDescription($body->get('description'));
        $product->setImageFile($uploadedFile);

        $errors = $validator->validate($product);
        if(count($errors) > 0) {
            return $this->json($errors, 400); 
        }

        $product->setOwner($user); //jwt

        $em->persist($product);
        $em->flush();

        return $this->json($product, 201, [], ['groups' => "products"]);   
    }

    /**
     * @Route("/products/{product<[0-9]+>}/remove", name="_remove", methods="PUT")
     */
    public function remove(EntityManagerInterface $em, Product $product)
    {
        $product->setIsAvailable(false);
        $em->flush();
        return $this->json($product, 200, [], ['groups' => "products"]);
    }

    /**
     * @Route("/products/{product<[0-9]+>}/reactivate", name="_reactivate", methods="PUT")
     */
    public function reactivate(EntityManagerInterface $em, Product $product)
    { 
        $product->setIsAvailable(true);
        $em->flush();
        return $this->json($product, 200, [], ['groups' => "products"]);
    }

     /**
     * @Route("/products/{product<[0-9]+>}/edit", name="_edit", methods="POST")
     */
    public function edit(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, Product $product)
    {
        $uploadedFile = $request->files->get('imageFile');  
        $name = $request->request->get('name');
        $description = $request->request->get('description');

        empty($name) ? true : $product->setName($name);
        empty($description) ? true : $product->setDescription($description);
        isset($uploadedFile) ? $product->setImageFile($uploadedFile) : true;

        $errors = $validator->validate($product);
        if(count($errors) > 0) {
            return $this->json($errors, 400); 
        }
        
        $em->flush();

        return $this->json(['product' => $product, 'name' => $name], 200, [], ['groups' => "products"]);   
    }
}

//update
//$productDeserialized = $serializer->deserialize($json, Product::class, 'json', array('object_to_populate' => $product));
