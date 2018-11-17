<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 * 
 * @ApiResource(attributes={"order"={"name": "ASC"}})  
 *  */
class Category
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $created;

    /**
     * @ORM\OneToMany(targetEntity="Activity",mappedBy="category", cascade={"remove","persist"})
     */
    private $activities;

    /**
     * @ORM\OneToMany(targetEntity="Photo", mappedBy="category" ,cascade={"all"})
     */
    private $photos;
   
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->activities = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set created.
     *
     * @param int $created
     *
     * @return Category
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created.
     *
     * @return int
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Add activity.
     *
     * @param \App\Entity\Activity $activity
     *
     * @return Category
     */
    public function addActivity(\App\Entity\Activity $activity)
    {
        $this->activities[] = $activity;

        return $this;
    }

    /**
     * Remove activity.
     *
     * @param \App\Entity\Activity $activity
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeActivity(\App\Entity\Activity $activity)
    {
        return $this->activities->removeElement($activity);
    }

    /**
     * Get activities.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getActivities()
    {
        return $this->activities;
    }

    /**
     * Add photo.
     *
     * @param \App\Entity\Photo $photo
     *
     * @return Category
     */
    public function addPhoto(\App\Entity\Photo $photo)
    {
        $this->photos[] = $photo;
        $photo->setCategory($this);
        return $this;
    }

    /**
     * Remove photo.
     *
     * @param \App\Entity\Photo $photo
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removePhoto(\App\Entity\Photo $photo)
    {
        return $this->photos->removeElement($photo);
    }

    /**
     * Get photos.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPhotos()
    {
        return $this->photos;
    }
}
