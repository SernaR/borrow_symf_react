<?php

namespace App\Controller\Api;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api", name="messages")
 */
class MessageController extends AbstractController
{
    private $serializer;
    private $em;
    private $validator;

    public function __construct(SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->serializer = $serializer;
        $this->em =  $em;
        $this->validator =  $validator;
    }
    /**
     * @Route("/messages/conversation/{conversation<[0-9]+>}", name="_addToConversation", methods="POST")
     */
    public function addToConversation(Request $request, Conversation $conversation)
    {
        $json = $request->getContent();
        return $this->store($conversation, $json);
    }

    /**
     * @Route("/messages/new/product/{product<[0-9]+>}", name="storeInNewConversation", methods="POST")
     */
    public function storeInNewConversation(Request $request, Product $product)
    {
        $conversation = new Conversation();
        $conversation->setProduct($product);
        $this->em->persist($conversation);

        $json = $request->getContent();
        return $this->store($conversation, $json);
    }

    private function store(Conversation $conversation, $json)
    {
        try {
            $message = $this->serializer->deserialize($json, Message::class, 'json');
            $message->setConversation($conversation);
            //$message->setUser);

            $errors = $this->validator->validate($message);
            if(count($errors) > 0) {
                return $this->json($errors, 400); 
            }

            $this->em->persist($message);
            $this->em->flush();

            return $this->json($message, 200, [], ['groups' => 'message']);

        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
