<?php

namespace App\Repository;

use App\Entity\Conversation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Conversation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Conversation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Conversation[]    findAll()
 * @method Conversation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConversationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Conversation::class);
    }

    public function findByOwner($owner)
    {
        return $this->createQueryBuilder('c')
            ->join('c.product', 'p')
            ->join('p.owner', 'o')
            ->andWhere('c.isDone = :isDone')
            ->andWhere('o.id = :owner')
            ->setParameter('owner', $owner)
            ->setParameter('isDone', false)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByBorrower($borrower, $product)
    {
        return $this->createQueryBuilder('c')
            ->join('c.messages', 'm')
            ->join('m.user', 'u')
            ->andWhere('c.product = :product')
            ->andWhere('c.isDone = :isDone')
            ->andWhere('u.id = :borrower')
            ->setParameter('product', $product)
            ->setParameter('isDone', false)
            ->setParameter('borrower', $borrower)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    // /**
    //  * @return Conversation[] Returns an array of Conversation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Conversation
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
