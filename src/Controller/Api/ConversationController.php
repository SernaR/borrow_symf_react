<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Conversation;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ConversationRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

/**
 * @Route("/api", name="conversations")
 */
class ConversationController extends AbstractController
{
    /**
     * @Route("/conversations/{user<[0-9]+>}", name="_index", methods="GET")
     */
    public function index(ConversationRepository $repo, User $user)
    {
        //user par jwt
        // $current_user = $this->getUser();
        // $id = $current_user->getId();
        
        $conversations = $repo->findByOwner($user->getId());
        return $this->json( $conversations, 200, [], ['groups' => "conversations"]);
    }

    /**
     * @Route("/conversations/{conversation<[0-9]+>}/book", name="_book", methods="PUT")
     */
    public function book(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, Conversation $conversation) //status réservé
    {
        $json = $request->getContent();

        $errors = $this->checkBookingDates($json);
        if(count($errors) > 0) {
            return $this->json($errors, 400); 
        }

        try { 
            $conversationDeserialized = $serializer->deserialize($json, Conversation::class, 'json', array('object_to_populate' => $conversation));
            
            $em->flush();
            return $this->json($conversationDeserialized, 200, [], ['groups' => "conversations"]);

        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/conversations/{conversation<[0-9]+>}/confirm/booking", name="_confirmBooking", methods="PUT")
     */
    public function confirmBooking(Conversation $conversation, EntityManagerInterface $em) 
    {
        $conversation->setIsConfirmed(true);
        $em->flush();
        return $this->json( $conversation, 200, [], ['groups' => "conversations"]);
    } 

    /**
     * @Route("/conversations/{conversation<[0-9]+>}/confirm/return", name="_confirmReturn", methods="PUT")
     */
    public function confirmReturn(Conversation $conversation, EntityManagerInterface $em)  
    {
        $conversation->setIsDone(true);
        $em->flush();
        return $this->json( $conversation, 200, [], ['groups' => "conversations"]);
    } 
    
    private function checkBookingDates($json) {
        $data = json_decode($json, true);
        $violations = [];
        
        if( !isset($data['borrowStart']) ){
            array_push($violations, [
                "propertyPath" => "borrowStart",
                "title" => "la date de début est obligatoire",
            ]);
        }else {
             if( $data['borrowStart'] <  date('Y-m-d') ){
                array_push($violations, [
                    "propertyPath" => "borrowStart",
                    "title" => "la date de début doit être supérieure à aujourd'hui",
                ]);
            }
            if( empty( $data['borrowEnd'] ) ){
                array_push($violations, [
                    "propertyPath" => "borrowEnd",
                    "title" => "la date de fin est obligatoire",
                ]);
            }else {
                if( $data['borrowEnd'] < $data['borrowStart'] ){
                    array_push($violations, [
                        "propertyPath" => "borrowEnd",
                        "title" => "la date de fin doit être plus grande que la date de début",
                    ]);
                }
            }
        }
        return $violations;
    }
}
