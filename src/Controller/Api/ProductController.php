<?php

namespace App\Controller\Api;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/products", name="product")
 */
class ProductController extends AbstractController
{
    /**
     * @Route("/{productId<[0-9]+>}", name="_find", methods={"GET"})
     */
    public function find(ProductRepository $repo, $productId) {
        $product =  $repo->find($productId);
        
        if (!$product) {
            return $this->json([
                'status' => 400,
                'message' => "désolé l'article n'existe plus"
            ], 400);
        }

        return $this->json( $product, 200, [], ['groups' => "products"]);
    }

    /**
     * @Route("/", name="_index", methods={"GET"})
     */
    public function index(ProductRepository $repo)
    {
        $products = $repo->findBy([], ['createdAt' => 'DESC']);
        return $this->json( $products, 200, [], ['groups' => "products"]);
    }

}
