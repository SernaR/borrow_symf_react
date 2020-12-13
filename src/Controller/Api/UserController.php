<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api", name="users")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/register", name="_register", methods="POST")
     */
    public function register(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder)
    {
        $json = $request->getContent();
        $user = $serializer->deserialize($json, User::class, 'json');
        
        $errors = $validator->validate($user);
        if(count($errors) > 0) {
            return $this->json($errors, 400); 
        }

        $password = $encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($password);

        $em->persist($user);
        $em->flush();

        return $this->json($user, 201, [], ['groups' => "user"]);
    }
}
