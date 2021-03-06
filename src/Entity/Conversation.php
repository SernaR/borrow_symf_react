<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\Timestampable;
use App\Repository\ConversationRepository;
use Doctrine\Common\Collections\Collection;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ConversationRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Conversation
{
    use Timestampable;
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"message", "conversations"})
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isDone = false;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="conversations")
     * @Groups("conversations")
     */
    private $product;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="conversation")
     * @Groups("conversations")
     */
    private $messages;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("conversations")
     */
    private $borrowStart;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("conversations")
     */
    private $borrowEnd;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isConfirmed = false;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsDone(): ?bool
    {
        return $this->isDone;
    }

    public function setIsDone(bool $isDone): self
    {
        $this->isDone = $isDone;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setConversation($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getConversation() === $this) {
                $message->setConversation(null);
            }
        }

        return $this;
    }

    public function getBorrowStart(): ?\DateTimeInterface
    {
        return $this->borrowStart;
    }

    public function setBorrowStart(?\DateTimeInterface $borrowStart): self
    {
        $this->borrowStart = $borrowStart;

        return $this;
    }

    public function getBorrowEnd(): ?\DateTimeInterface
    {
        return $this->borrowEnd;
    }

    public function setBorrowEnd(?\DateTimeInterface $borrowEnd): self
    {
        $this->borrowEnd = $borrowEnd;

        return $this;
    }

    public function getIsConfirmed(): ?bool
    {
        return $this->isConfirmed;
    }

    public function setIsConfirmed(?bool $isConfirmed): self
    {
        $this->isConfirmed = $isConfirmed;

        return $this;
    }
}
