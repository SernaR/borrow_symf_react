<?php

namespace App\Entity;

use App\Entity\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductRepository;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Product
{
    use Timestampable;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("products")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("products")
     * @Assert\NotBlank(message="Le nom de l'article est obligatoire")
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="products")
     * @Groups("products")
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity=Conversation::class, mappedBy="product")
     */
    private $conversations;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAvailable = true;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="La description est obligatoire")
     * @Assert\Length(min=3)
     * @Groups("products")
     */
    private $description;

    
    public function __construct()
    {
        $this->conversations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection|Conversation[]
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): self
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations[] = $conversation;
            $conversation->setProduct($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): self
    {
        if ($this->conversations->removeElement($conversation)) {
            // set the owning side to null (unless already changed)
            if ($conversation->getProduct() === $this) {
                $conversation->setProduct(null);
            }
        }

        return $this;
    }

    public function getIsAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(bool $isAvailable): self
    {
        $this->isAvailable = $isAvailable;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
