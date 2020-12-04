<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

// todo : function toggleRemove ?? 2 en 1 ??

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
    public function store(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, User $user, ValidatorInterface $validator)
    {
        $json = $request->getContent();
        try {
            $product = $serializer->deserialize($json, Product::class, 'json');
            $product->setOwner($user); //jwt
            
            $errors = $validator->validate($product);
            if(count($errors) > 0) {
                return $this->json($errors, 400); 
            }
            
            $em->persist($product);
            $em->flush();

            return $this->json($product, 201, [], ['groups' => "products"]);

        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
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
     * @Route("/products/{product<[0-9]+>}", name="_edit", methods="PUT")
     */
    public function edit(Request $request, SerializerInterface $serializer,EntityManagerInterface $em, ValidatorInterface $validator, Product $product)
    {
        $json = $request->getContent();
        try {
            $productDeserialized = $serializer->deserialize($json, Product::class, 'json', array('object_to_populate' => $product));
            
            $errors = $validator->validate($productDeserialized);
            if(count($errors) > 0) {
                return $this->json($errors, 400); 
            }
            
            $em->flush();
            return $this->json($productDeserialized, 200, [], ['groups' => "products"]);

        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        } 
    }

}
