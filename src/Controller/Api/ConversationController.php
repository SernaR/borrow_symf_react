<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\ConversationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="conversations")
 */
class ConversationController extends AbstractController
{
    /**
     * @Route("/conversations/{user}", name="_index", methods="GET")
     */
    public function index(ConversationRepository $repo,User $user)
    {
        //user par jwt
        // $current_user = $this->getUser();
        // $id = $current_user->getId();
        
        $conversations = $repo->findByOwner($user->getId());
        return $this->json( $conversations, 200, [], ['groups' => "conversations"]);
    }
}
